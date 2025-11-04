const Booking = require('../models/Booking');
const Bike = require('../models/Bike');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin or Own Bookings
const getBookings = async (req, res, next) => {
  try {
    let query;

    // If not admin, show only user's bookings
    if (req.user.role !== 'admin') {
      query = Booking.find({ user: req.user.id });
    } else {
      query = Booking.find();
    }

    query = query
      .populate('user', 'name email phone')
      .populate('bike', 'name images pricePerDay location')
      .sort({ createdAt: -1 });

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;

    const total = await Booking.countDocuments();
    const bookings = await query.skip(startIndex).limit(limit);

    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalBookings: total,
      hasNext: page * limit < total,
      hasPrev: page > 1
    };

    res.status(200).json({
      success: true,
      count: bookings.length,
      pagination,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private/Admin or Own Booking
const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('bike', 'name images pricePerDay location specifications');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns booking or is admin
    if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this booking'
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res, next) => {
  try {
    const { bikeId, startDate, endDate, specialRequests } = req.body;

    // Check if bike exists and is available
    const bike = await Bike.findById(bikeId);
    if (!bike) {
      return res.status(404).json({
        success: false,
        message: 'Bike not found'
      });
    }

    if (!bike.availability) {
      return res.status(400).json({
        success: false,
        message: 'Bike is not available'
      });
    }

    // Check availability for the date range
    const isAvailable = await Booking.checkAvailability(bikeId, new Date(startDate), new Date(endDate));
    if (!isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'Bike is not available for the selected dates'
      });
    }

    // Calculate total price
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalPrice = diffDays * bike.pricePerDay;

    // Create booking
    const booking = await Booking.create({
      user: req.user.id,
      bike: bikeId,
      startDate: start,
      endDate: end,
      totalDays: diffDays,
      totalPrice,
      pickupLocation: bike.location,
      specialRequests
    });

    // Add booking to user's bookings
    await User.findByIdAndUpdate(req.user.id, {
      $push: { bookings: booking._id }
    });

    // Add booking to bike's bookings
    await Bike.findByIdAndUpdate(bikeId, {
      $push: { bookings: booking._id }
    });

    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking
// @route   PUT /api/bookings/:id
// @access  Private/Admin or Own Booking
const updateBooking = async (req, res, next) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns booking or is admin
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this booking'
      });
    }

    // Prevent updating completed or cancelled bookings
    if (booking.status === 'completed' || booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Cannot update completed or cancelled bookings'
      });
    }

    booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel booking
// @route   DELETE /api/bookings/:id
// @access  Private/Admin or Own Booking
const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns booking or is admin
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      });
    }

    // Prevent cancelling completed bookings
    if (booking.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel completed bookings'
      });
    }

    booking.status = 'cancelled';
    booking.cancelledAt = new Date();
    booking.cancellationReason = req.body.reason || 'Cancelled by user';
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Process payment
// @route   POST /api/bookings/:id/payment
// @access  Private
const processPayment = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns booking
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to process payment for this booking'
      });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: booking.totalPrice * 100, // Stripe expects amount in cents
      currency: 'usd',
      metadata: {
        bookingId: booking._id.toString(),
        bikeId: booking.bike.toString()
      }
    });

    booking.paymentIntentId = paymentIntent.id;
    await booking.save();

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Confirm payment
// @route   POST /api/bookings/:id/confirm-payment
// @access  Private
const confirmPayment = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    booking.status = 'confirmed';
    booking.paymentStatus = 'paid';
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Payment confirmed successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get booking stats
// @route   GET /api/bookings/stats
// @access  Private/Admin
const getBookingStats = async (req, res, next) => {
  try {
    const stats = await Booking.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalRevenue: { $sum: '$totalPrice' }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  cancelBooking,
  processPayment,
  confirmPayment,
  getBookingStats
};
