const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Bike = require('../models/Bike');
const Category = require('../models/Category');
const Booking = require('../models/Booking');
const Review = require('../models/Review');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample data
const categories = [
  { name: 'Mountain Bike', description: 'Perfect for off-road adventures', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', bikeCount: 0, isActive: true },
  { name: 'Road Bike', description: 'Built for speed and long-distance cycling', image: 'https://images.unsplash.com/photo-1544191696-15693072dd8e?w=400', bikeCount: 0, isActive: true },
  { name: 'Electric Bike', description: 'Assisted pedaling for easier riding', image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400', bikeCount: 0, isActive: true },
  { name: 'Hybrid Bike', description: 'Versatile bikes for city and light trails', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400', bikeCount: 0, isActive: true },
  { name: 'BMX', description: 'Tricks and urban riding', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', bikeCount: 0, isActive: true },
  { name: 'Cruiser', description: 'Comfortable bikes for leisurely rides', image: 'https://images.unsplash.com/photo-1544191696-15693072dd8e?w=400', bikeCount: 0, isActive: true }
];

const bikes = [
  {
    name: 'Trek Marlin 5',
    description: 'A versatile mountain bike perfect for beginners and intermediate riders. Features 21-speed Shimano drivetrain and hydraulic disc brakes.',
    type: 'Mountain Bike',
    brand: 'Trek',
    pricePerDay: 35,
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
      'https://images.unsplash.com/photo-1544191696-15693072dd8e?w=800'
    ],
    specs: {
      frameSize: 'M',
      gears: 21,
      weight: '14.5 kg',
      wheelSize: '27.5"'
    },
    location: {
      address: '123 Main St, San Francisco, CA',
      coordinates: [-122.4194, 37.7749]
    },
    availability: true,
    rating: 4.5,
    reviewCount: 0,
    category: null // Will be set after categories are created
  },
  {
    name: 'Giant Defy Advanced',
    description: 'A high-performance road bike with carbon frame and integrated cockpit. Ideal for long rides and racing.',
    type: 'Road Bike',
    brand: 'Giant',
    pricePerDay: 45,
    images: [
      'https://images.unsplash.com/photo-1544191696-15693072dd8e?w=800',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'
    ],
    specs: {
      frameSize: 'L',
      gears: 22,
      weight: '8.2 kg',
      wheelSize: '700c'
    },
    location: {
      address: '456 Oak Ave, Los Angeles, CA',
      coordinates: [-118.2437, 34.0522]
    },
    availability: true,
    rating: 4.8,
    reviewCount: 0,
    category: null
  },
  {
    name: 'Rad Power Bikes RadCity',
    description: 'Electric bike with pedal assist up to 20 mph. Perfect for commuting and leisure rides.',
    type: 'Electric Bike',
    brand: 'Rad Power Bikes',
    pricePerDay: 55,
    images: [
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800',
      'https://images.unsplash.com/photo-1544191696-15693072dd8e?w=800'
    ],
    specs: {
      frameSize: 'M',
      gears: 7,
      weight: '21.5 kg',
      batteryRange: '45 miles'
    },
    location: {
      address: '789 Pine St, Seattle, WA',
      coordinates: [-122.3321, 47.6062]
    },
    availability: true,
    rating: 4.6,
    reviewCount: 0,
    category: null
  },
  {
    name: 'Cannondale Synapse',
    description: 'Comfortable hybrid bike with carbon frame. Great for city commuting and light trails.',
    type: 'Hybrid Bike',
    brand: 'Cannondale',
    pricePerDay: 40,
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'
    ],
    specs: {
      frameSize: 'M',
      gears: 24,
      weight: '10.8 kg',
      wheelSize: '700c'
    },
    location: {
      address: '321 Elm St, Austin, TX',
      coordinates: [-97.7431, 30.2672]
    },
    availability: true,
    rating: 4.4,
    reviewCount: 0,
    category: null
  },
  {
    name: 'Haro Downtown',
    description: 'Stylish BMX bike perfect for urban riding and tricks. Lightweight aluminum frame.',
    type: 'BMX',
    brand: 'Haro',
    pricePerDay: 25,
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
      'https://images.unsplash.com/photo-1544191696-15693072dd8e?w=800'
    ],
    specs: {
      frameSize: 'M',
      gears: 'Single speed',
      weight: '11.2 kg',
      wheelSize: '20"'
    },
    location: {
      address: '654 Maple Ave, Miami, FL',
      coordinates: [-80.1918, 25.7617]
    },
    availability: true,
    rating: 4.2,
    reviewCount: 0,
    category: null
  },
  {
    name: 'Electra Cruiser',
    description: 'Comfortable cruiser bike with wide tires and upright riding position. Perfect for beach rides.',
    type: 'Cruiser',
    brand: 'Electra',
    pricePerDay: 30,
    images: [
      'https://images.unsplash.com/photo-1544191696-15693072dd8e?w=800',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'
    ],
    specs: {
      frameSize: 'M',
      gears: 'Single speed',
      weight: '15.8 kg',
      wheelSize: '26"'
    },
    location: {
      address: '987 Beach Blvd, San Diego, CA',
      coordinates: [-117.1611, 32.7157]
    },
    availability: true,
    rating: 4.3,
    reviewCount: 0,
    category: null
  },
  {
    name: 'Specialized Stumpjumper',
    description: 'Premium mountain bike with advanced suspension and carbon frame. For serious trail riders.',
    type: 'Mountain Bike',
    brand: 'Specialized',
    pricePerDay: 60,
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
      'https://images.unsplash.com/photo-1544191696-15693072dd8e?w=800'
    ],
    specs: {
      frameSize: 'L',
      gears: 12,
      weight: '12.8 kg',
      wheelSize: '29"'
    },
    location: {
      address: '147 Forest Rd, Boulder, CO',
      coordinates: [-105.2705, 40.0150]
    },
    availability: true,
    rating: 4.9,
    reviewCount: 0,
    category: null
  },
  {
    name: 'Pinarello Dogma',
    description: 'Professional road bike used by Tour de France teams. Carbon monocoque frame.',
    type: 'Road Bike',
    brand: 'Pinarello',
    pricePerDay: 75,
    images: [
      'https://images.unsplash.com/photo-1544191696-15693072dd8e?w=800',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'
    ],
    specs: {
      frameSize: 'M',
      gears: 22,
      weight: '7.9 kg',
      wheelSize: '700c'
    },
    location: {
      address: '258 Race St, Denver, CO',
      coordinates: [-104.9903, 39.7392]
    },
    availability: true,
    rating: 4.7,
    reviewCount: 0,
    category: null
  },
  {
    name: 'Aventon Level',
    description: 'Affordable electric bike with reliable pedal assist. Great for daily commuting.',
    type: 'Electric Bike',
    brand: 'Aventon',
    pricePerDay: 50,
    images: [
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800',
      'https://images.unsplash.com/photo-1544191696-15693072dd8e?w=800'
    ],
    specs: {
      frameSize: 'M',
      gears: 7,
      weight: '20.2 kg',
      batteryRange: '40 miles'
    },
    location: {
      address: '369 City Center, Phoenix, AZ',
      coordinates: [-112.0740, 33.4484]
    },
    availability: true,
    rating: 4.5,
    reviewCount: 0,
    category: null
  },
  {
    name: 'Trek FX',
    description: 'Popular hybrid bike with aluminum frame. Versatile for commuting and recreation.',
    type: 'Hybrid Bike',
    brand: 'Trek',
    pricePerDay: 38,
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'
    ],
    specs: {
      frameSize: 'M',
      gears: 21,
      weight: '12.1 kg',
      wheelSize: '700c'
    },
    location: {
      address: '741 Downtown, Portland, OR',
      coordinates: [-122.6784, 45.5152]
    },
    availability: true,
    rating: 4.4,
    reviewCount: 0,
    category: null
  },
  {
    name: 'Haro Shredder',
    description: 'Entry-level BMX bike for beginners. Durable steel frame with basic components.',
    type: 'BMX',
    brand: 'Haro',
    pricePerDay: 20,
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
      'https://images.unsplash.com/photo-1544191696-15693072dd8e?w=800'
    ],
    specs: {
      frameSize: 'M',
      gears: 'Single speed',
      weight: '12.8 kg',
      wheelSize: '20"'
    },
    location: {
      address: '852 Urban St, Chicago, IL',
      coordinates: [-87.6298, 41.8781]
    },
    availability: true,
    rating: 4.0,
    reviewCount: 0,
    category: null
  },
  {
    name: 'Vilano Cruiser',
    description: 'Retro-style cruiser with balloon tires. Comfortable for casual riding.',
    type: 'Cruiser',
    brand: 'Vilano',
    pricePerDay: 28,
    images: [
      'https://images.unsplash.com/photo-1544191696-15693072dd8e?w=800',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'
    ],
    specs: {
      frameSize: 'M',
      gears: 'Single speed',
      weight: '16.5 kg',
      wheelSize: '26"'
    },
    location: {
      address: '963 Coastal Rd, Santa Monica, CA',
      coordinates: [-118.4912, 34.0194]
    },
    availability: true,
    rating: 4.1,
    reviewCount: 0,
    category: null
  },
  {
    name: 'Santa Cruz Hightower',
    description: 'Full-suspension mountain bike with 150mm of travel. For technical downhill trails.',
    type: 'Mountain Bike',
    brand: 'Santa Cruz',
    pricePerDay: 70,
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
      'https://images.unsplash.com/photo-1544191696-15693072dd8e?w=800'
    ],
    specs: {
      frameSize: 'L',
      gears: 12,
      weight: '14.2 kg',
      wheelSize: '27.5"'
    },
    location: {
      address: '159 Trail Head, Asheville, NC',
      coordinates: [-82.5515, 35.5951]
    },
    availability: true,
    rating: 4.8,
    reviewCount: 0,
    category: null
  },
  {
    name: 'Cervelo Caledonia',
    description: 'Endurance road bike with disc brakes and integrated cockpit. Comfortable for long rides.',
    type: 'Road Bike',
    brand: 'Cervelo',
    pricePerDay: 65,
    images: [
      'https://images.unsplash.com/photo-1544191696-15693072dd8e?w=800',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'
    ],
    specs: {
      frameSize: 'M',
      gears: 24,
      weight: '8.5 kg',
      wheelSize: '700c'
    },
    location: {
      address: '357 Valley Rd, Salt Lake City, UT',
      coordinates: [-111.8910, 40.7608]
    },
    availability: true,
    rating: 4.6,
    reviewCount: 0,
    category: null
  },
  {
    name: 'Trek Verve',
    description: 'Electric hybrid bike with Bosch motor. Perfect for assisted commuting.',
    type: 'Electric Bike',
    brand: 'Trek',
    pricePerDay: 58,
    images: [
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800',
      'https://images.unsplash.com/photo-1544191696-15693072dd8e?w=800'
    ],
    specs: {
      frameSize: 'M',
      gears: 10,
      weight: '22.8 kg',
      batteryRange: '50 miles'
    },
    location: {
      address: '468 Greenway, Minneapolis, MN',
      coordinates: [-93.2650, 44.9778]
    },
    availability: true,
    rating: 4.7,
    reviewCount: 0,
    category: null
  },
  {
    name: 'Giant Escape',
    description: 'Reliable hybrid bike with Shimano components. Great value for everyday riding.',
    type: 'Hybrid Bike',
    brand: 'Giant',
    pricePerDay: 32,
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'
    ],
    specs: {
      frameSize: 'M',
      gears: 24,
      weight: '11.9 kg',
      wheelSize: '700c'
    },
    location: {
      address: '579 Park Ave, Atlanta, GA',
      coordinates: [-84.3880, 33.7490]
    },
    availability: true,
    rating: 4.3,
    reviewCount: 0,
    category: null
  }
];

const users = [
  {
    name: 'Admin User',
    email: 'admin@bikerental.com',
    password: 'password123',
    phone: '+1234567890',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    favorites: [],
    bookings: []
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    phone: '+1987654321',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    favorites: [],
    bookings: []
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    phone: '+1122334455',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    favorites: [],
    bookings: []
  }
];

// Import function
const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Bike.deleteMany();
    await Category.deleteMany();
    await Booking.deleteMany();
    await Review.deleteMany();

    // Create categories
    const createdCategories = await Category.insertMany(categories);
    console.log('Categories imported...');

    // Map categories to bikes
    const categoryMap = {};
    createdCategories.forEach(cat => {
      categoryMap[cat.name] = cat._id;
    });

    bikes.forEach(bike => {
      bike.category = categoryMap[bike.type];
    });

    // Create bikes
    const createdBikes = await Bike.insertMany(bikes);
    console.log('Bikes imported...');

    // Update category bike counts
    for (const category of createdCategories) {
      const bikeCount = createdBikes.filter(bike => bike.category.toString() === category._id.toString()).length;
      await Category.findByIdAndUpdate(category._id, { bikeCount });
    }

    // Create users
    await User.insertMany(users);
    console.log('Users imported...');

    console.log('Data Import Success!');
    process.exit();
  } catch (error) {
    console.error('Data Import Error:', error);
    process.exit(1);
  }
};

// Delete function
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Bike.deleteMany();
    await Category.deleteMany();
    await Booking.deleteMany();
    await Review.deleteMany();

    console.log('Data Destroyed...');
    process.exit();
  } catch (error) {
    console.error('Data Destroy Error:', error);
    process.exit(1);
  }
};

// Run based on command line arguments
if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}
