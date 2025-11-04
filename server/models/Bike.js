const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a bike name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  type: {
    type: String,
    required: [true, 'Please add a bike type'],
    enum: ['Mountain', 'Road', 'Electric', 'Hybrid', 'BMX', 'Cruiser']
  },
  brand: {
    type: String,
    required: [true, 'Please add a brand'],
    trim: true
  },
  pricePerDay: {
    type: Number,
    required: [true, 'Please add a price per day'],
    min: [1, 'Price must be at least 1']
  },
  images: [{
    type: String,
    required: true
  }],
  specifications: {
    frameSize: {
      type: String,
      required: [true, 'Please add frame size']
    },
    gears: {
      type: Number,
      required: [true, 'Please add number of gears'],
      min: 1
    },
    weight: {
      type: Number,
      required: [true, 'Please add weight in kg'],
      min: 1
    },
    wheelSize: {
      type: String,
      required: [true, 'Please add wheel size']
    },
    material: {
      type: String,
      required: [true, 'Please add frame material']
    },
    brakes: {
      type: String,
      required: [true, 'Please add brake type']
    }
  },
  location: {
    address: {
      type: String,
      required: [true, 'Please add pickup address']
    },
    city: {
      type: String,
      required: [true, 'Please add city']
    },
    state: {
      type: String,
      required: [true, 'Please add state']
    },
    zipCode: {
      type: String,
      required: [true, 'Please add zip code']
    },
    coordinates: {
      lat: {
        type: Number,
        required: [true, 'Please add latitude']
      },
      lng: {
        type: Number,
        required: [true, 'Please add longitude']
      }
    }
  },
  availability: {
    type: Boolean,
    default: true
  },
  condition: {
    type: String,
    enum: ['Excellent', 'Good', 'Fair'],
    default: 'Good'
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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

// Virtual for average rating
bikeSchema.virtual('averageRating').get(function() {
  return this.rating;
});

// Index for performance
bikeSchema.index({ type: 1 });
bikeSchema.index({ pricePerDay: 1 });
bikeSchema.index({ location: '2dsphere' });
bikeSchema.index({ rating: -1 });
bikeSchema.index({ createdAt: -1 });
bikeSchema.index({ name: 'text', description: 'text' }); // Text search

// Cascade delete bookings when bike is deleted
bikeSchema.pre('remove', async function(next) {
  await this.model('Booking').deleteMany({ bike: this._id });
  await this.model('Review').deleteMany({ bike: this._id });
  next();
});

module.exports = mongoose.model('Bike', bikeSchema);
