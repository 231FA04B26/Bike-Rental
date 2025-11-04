const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
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
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: [true, 'Please add a booking']
  },
  rating: {
    type: Number,
    required: [true, 'Please add a rating'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  title: {
    type: String,
    required: [true, 'Please add a review title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  comment: {
    type: String,
    required: [true, 'Please add a review comment'],
    maxlength: [500, 'Comment cannot be more than 500 characters']
  },
  images: [{
    type: String
  }],
  helpful: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  verified: {
    type: Boolean,
    default: true // Reviews from completed bookings are verified
  },
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

// Prevent user from submitting more than one review per booking
reviewSchema.index({ user: 1, booking: 1 }, { unique: true });

// Index for performance
reviewSchema.index({ bike: 1, createdAt: -1 });
reviewSchema.index({ rating: -1 });
reviewSchema.index({ createdAt: -1 });

// Static method to calculate average rating for a bike
reviewSchema.statics.calculateAverageRating = async function(bikeId) {
  const stats = await this.aggregate([
    {
      $match: { bike: bikeId }
    },
    {
      $group: {
        _id: '$bike',
        averageRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 }
      }
    }
  ]);

  if (stats.length > 0) {
    await mongoose.model('Bike').findByIdAndUpdate(bikeId, {
      rating: Math.round(stats[0].averageRating * 10) / 10,
      reviewCount: stats[0].reviewCount
    });
  } else {
    await mongoose.model('Bike').findByIdAndUpdate(bikeId, {
      rating: 0,
      reviewCount: 0
    });
  }
};

// Call calculateAverageRating after save
reviewSchema.post('save', function() {
  this.constructor.calculateAverageRating(this.bike);
});

// Call calculateAverageRating after remove
reviewSchema.post('remove', function() {
  this.constructor.calculateAverageRating(this.bike);
});

module.exports = mongoose.model('Review', reviewSchema);
