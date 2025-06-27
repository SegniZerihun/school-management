const express = require('express');
const router = express.Router();
const { 
  createSubject, 
  getSubjects, 
  getSubjectById, 
  updateSubject, 
  deleteSubject 
} = require('../controllers/subjectController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, authorize('Admin'), createSubject)
  .get(protect, getSubjects);

router.route('/:id')
  .get(protect, getSubjectById)
  .put(protect, authorize('Admin'), updateSubject)
  .delete(protect, authorize('Admin'), deleteSubject);

module.exports = router;
