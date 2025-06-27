const express = require('express');
const router = express.Router();

const { 
  createOrUpdateMark, 
  getMarksForStudent 
} = require('../controllers/markController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, authorize('Admin', 'Teacher'), createOrUpdateMark);

router.route('/student/:studentId')
  .get(protect, authorize('Admin', 'Teacher', 'Student'), getMarksForStudent);

module.exports = router;
