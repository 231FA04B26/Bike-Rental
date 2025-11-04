const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
  addToFavorites,
  removeFromFavorites,
  getUserBookings
} = require('../controllers/userController');

const router = express.Router();

const { protect, authorize, ownerOrAdmin } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

// Admin only routes
router.get('/', authorize('admin'), getUsers);
router.post('/', authorize('admin'), createUser);

// Routes that require ownership or admin
router.get('/:id', ownerOrAdmin, getUser);
router.put('/:id', ownerOrAdmin, updateUser);
router.delete('/:id', authorize('admin'), deleteUser);

// User profile routes
router.get('/profile/me', getUserProfile);
router.put('/profile/me', updateUserProfile);

// Favorites routes
router.post('/favorites/:bikeId', addToFavorites);
router.delete('/favorites/:bikeId', removeFromFavorites);

// User bookings
router.get('/bookings/me', getUserBookings);

module.exports = router;
