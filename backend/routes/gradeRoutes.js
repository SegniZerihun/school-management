const express = require('express');
const router = express.Router();
const { 
  createGrade, 
  getGrades, 
  getGradeById, 
  updateGrade, 
  deleteGrade 
} = require('../controllers/gradeController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, authorize('Admin'), createGrade)
  .get(protect, getGrades);

router.route('/:id')
  .get(protect, getGradeById)
  .put(protect, authorize('Admin'), updateGrade)
  .delete(protect, authorize('Admin'), deleteGrade);

module.exports = router;
