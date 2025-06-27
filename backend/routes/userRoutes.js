// school-management/backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const {
  getUsersByRole,
  updateUser,
  deleteUser,
  getTeacherDashboardData // Import the new function
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

// This new route is specifically for teachers to get their dashboard data
router.get('/teacher-data', protect, authorize('Teacher'), getTeacherDashboardData);

// Existing routes
router.route('/')
  .get(protect, authorize('Admin'), getUsersByRole); // Only admin should get all users

router.route('/:id')
  .put(protect, authorize('Admin'), updateUser)
  .delete(protect, authorize('Admin'), deleteUser);

module.exports = router;
