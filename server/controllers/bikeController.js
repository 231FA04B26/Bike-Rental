const Bike = require('../models/Bike');
const Category = require('../models/Category');

// @desc    Get all bikes
// @route   GET /api/bikes
// @access  Public
const getBikes = async (req, res, next) => {
  try {
    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resource
    let query = Bike.find(JSON.parse(queryStr))
      .populate('category', 'name')
      .populate('createdBy', 'name');

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Bike.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const bikes = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: bikes.length,
      pagination,
      data: bikes
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single bike
// @route   GET /api/bikes/:id
// @access  Public
const getBike = async (req, res, next) => {
  try {
    const bike = await Bike.findById(req.params.id)
      .populate('category', 'name description')
      .populate('createdBy', 'name')
      .populate('reviews', 'rating comment user createdAt');

    if (!bike) {
      return res.status(404).json({
        success: false,
        message: 'Bike not found'
      });
    }

    res.status(200).json({
      success: true,
      data: bike
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new bike
// @route   POST /api/bikes
// @access  Private/Admin
const createBike = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.createdBy = req.user.id;

    const bike = await Bike.create(req.body);

    // Update category bike count
    await Category.findByIdAndUpdate(bike.category, { $inc: { bikeCount: 1 } });

    res.status(201).json({
      success: true,
      data: bike
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update bike
// @route   PUT /api/bikes/:id
// @access  Private/Admin
const updateBike = async (req, res, next) => {
  try {
    let bike = await Bike.findById(req.params.id);

    if (!bike) {
      return res.status(404).json({
        success: false,
        message: 'Bike not found'
      });
    }

    // Check if category is being changed
    const oldCategory = bike.category;
    const newCategory = req.body.category;

    bike = await Bike.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    // Update category bike counts if category changed
    if (oldCategory !== newCategory) {
      await Category.findByIdAndUpdate(oldCategory, { $inc: { bikeCount: -1 } });
      await Category.findByIdAndUpdate(newCategory, { $inc: { bikeCount: 1 } });
    }

    res.status(200).json({
      success: true,
      data: bike
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete bike
// @route   DELETE /api/bikes/:id
// @access  Private/Admin
const deleteBike = async (req, res, next) => {
  try {
    const bike = await Bike.findById(req.params.id);

    if (!bike) {
      return res.status(404).json({
        success: false,
        message: 'Bike not found'
      });
    }

    await bike.remove();

    // Update category bike count
    await Category.findByIdAndUpdate(bike.category, { $inc: { bikeCount: -1 } });

    res.status(200).json({
      success: true,
      message: 'Bike deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get bikes within radius
// @route   GET /api/bikes/radius/:zipcode/:distance
// @access  Public
const getBikesInRadius = async (req, res, next) => {
  try {
    const { zipcode, distance } = req.params;

    // Get lat/lng from geocoder
    // This would require a geocoding service like Google Maps API
    // For now, return all bikes
    const bikes = await Bike.find({
      availability: true
    }).populate('category', 'name');

    res.status(200).json({
      success: true,
      count: bikes.length,
      data: bikes
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get bike stats
// @route   GET /api/bikes/stats
// @access  Private/Admin
const getBikeStats = async (req, res, next) => {
  try {
    const stats = await Bike.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          avgPrice: { $avg: '$pricePerDay' },
          avgRating: { $avg: '$rating' }
        }
      },
      {
        $sort: { count: -1 }
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

// @desc    Search bikes
// @route   GET /api/bikes/search/:query
// @access  Public
const searchBikes = async (req, res, next) => {
  try {
    const query = req.params.query;

    const bikes = await Bike.find({
      $text: { $search: query },
      availability: true
    })
      .populate('category', 'name')
      .limit(20);

    res.status(200).json({
      success: true,
      count: bikes.length,
      data: bikes
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBikes,
  getBike,
  createBike,
  updateBike,
  deleteBike,
  getBikesInRadius,
  getBikeStats,
  searchBikes
};
