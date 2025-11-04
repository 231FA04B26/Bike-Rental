const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please add a user']
  },
  bike: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bike',
    required: [true, 'Please add a bike']
  },
  startDate: {
    type: Date,
    required: [true, 'Please add a start date']
  },
  endDate: {
    type: Date,
    required: [true, 'Please add an end date']
  },
  totalDays: {
    type: Number,
    required: true,
    min: [1, 'Booking must be at least 1 day']
  },
  totalPrice: {
    type: Number,
    required: [true, 'Please add a total price'],
    min: [0, 'Total price cannot be negative']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'active', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  paymentIntentId: {
    type: String,
    default: ''
  },
  pickupLocation: {
    address: String,
    city: String,
    state: String,
    zipCode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  specialRequests: {
    type: String,
    maxlength: [500, 'Special requests cannot be more than 500 characters']
  },
  cancellationReason: {
    type: String,
    maxlength: [500, 'Cancellation reason cannot be more than 500 characters']
  },
  cancelledAt: Date,
  completedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for duration
bookingSchema.virtual('duration').get(function() {
  const diffTime = Math.abs(this.endDate - this.startDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Calculate total price before saving
bookingSchema.pre('save', async function(next) {
  if (this.isModified('startDate') || this.isModified('endDate') || this.isModified('bike')) {
    const bike = await mongoose.model('Bike').findById(this.bike);
    if (bike) {
      const diffTime = Math.abs(this.endDate - this.startDate);
      this.totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      this.totalPrice = this.totalDays * bike.pricePerDay;
    }
  }
  next();
});

// Index for performance
bookingSchema.index({ user: 1, createdAt: -1 });
bookingSchema.index({ bike: 1, startDate: 1, endDate: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ createdAt: -1 });

// Static method to check availability
bookingSchema.statics.checkAvailability = async function(bikeId, startDate, endDate) {
  const conflictingBookings = await this.find({
    bike: bikeId,
    status: { $in: ['confirmed', 'active'] },
    $or: [
      { startDate: { $lt: endDate, $gte: startDate } },
      { endDate: { $gt: startDate, $lte: endDate } },
      { startDate: { $lte: startDate }, endDate: { $gte: endDate } }
    ]
  });

  return conflictingBookings.length === 0;
};

module.exports = mongoose.model('Booking', bookingSchema);
