// API URLs
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Bike types
export const BIKE_TYPES = [
  'Mountain Bike',
  'Road Bike',
  'Electric Bike',
  'Hybrid Bike',
  'BMX',
  'Cruiser'
];

// Booking statuses
export const BOOKING_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// Payment statuses
export const PAYMENT_STATUSES = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded'
};

// User roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};

// Price ranges for filters
export const PRICE_RANGES = [
  { label: 'Under $25', min: 0, max: 25 },
  { label: '$25 - $50', min: 25, max: 50 },
  { label: '$50 - $75', min: 50, max: 75 },
  { label: 'Over $75', min: 75, max: Infinity }
];

// Date format options
export const DATE_FORMAT_OPTIONS = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

// Time format options
export const TIME_FORMAT_OPTIONS = {
  hour: '2-digit',
  minute: '2-digit'
};
