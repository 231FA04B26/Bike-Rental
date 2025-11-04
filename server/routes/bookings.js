const express = require('express');
const {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  cancelBooking,
  processPayment,
  confirmPayment,
  getBookingStats
} = require('../controllers/bookingController');

const router = express.Router();

const { protect, authorize, ownerOrAdmin } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

// User routes
router.get('/', getBookings);
router.post('/', createBooking);

// Routes that require ownership or admin
router.get('/:id', ownerOrAdmin, getBooking);
router.put('/:id', ownerOrAdmin, updateBooking);
router.delete('/:id', ownerOrAdmin, cancelBooking);

// Payment routes
router.post('/:id/payment', ownerOrAdmin, processPayment);
router.post('/:id/confirm-payment', ownerOrAdmin, confirmPayment);

// Admin only routes
router.get('/stats/overview', authorize('admin'), getBookingStats);

module.exports = router;
