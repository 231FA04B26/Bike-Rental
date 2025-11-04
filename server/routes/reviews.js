const express = require('express');
const {
  getReviews,
  getReview,
  getBikeReviews,
  createReview,
  updateReview,
  deleteReview,
  markHelpful,
  getReviewStats
} = require('../controllers/reviewController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getReviews);
router.get('/:id', getReview);
router.get('/bike/:bikeId', getBikeReviews);

// Protected routes
router.use(protect);

router.post('/', createReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);
router.post('/:id/helpful', markHelpful);

// Admin only routes
router.get('/stats/overview', authorize('admin'), getReviewStats);

module.exports = router;
