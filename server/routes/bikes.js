const express = require('express');
const {
  getBikes,
  getBike,
  createBike,
  updateBike,
  deleteBike,
  getBikesInRadius,
  getBikeStats,
  searchBikes
} = require('../controllers/bikeController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getBikes);
router.get('/search/:query', searchBikes);
router.get('/radius/:zipcode/:distance', getBikesInRadius);
router.get('/:id', getBike);

// Protected routes (Admin only)
router.use(protect);
router.use(authorize('admin'));

router.post('/', createBike);
router.put('/:id', updateBike);
router.delete('/:id', deleteBike);
router.get('/stats/overview', getBikeStats);

module.exports = router;
