// school-management/backend/controllers/gradeController.js

const Grade = require('../models/Grade');

exports.createGrade = async (req, res) => {
  try {
    const grade = await Grade.create(req.body);
    res.status(201).json({ success: true, data: grade });
  } catch (error) {
    res.status(400).json({ success: false, msg: error.message });
  }
};

exports.getGrades = async (req, res) => {
  try {
    // Populate the 'subjects' field to get subject names
    const grades = await Grade.find().populate('subjects', 'name');
    res.status(200).json({ success: true, count: grades.length, data: grades });
  } catch (error) {
    res.status(400).json({ success: false, msg: error.message });
  }
};

exports.getGradeById = async (req, res) => {
  try {
    // Populate the 'subjects' field here as well
    const grade = await Grade.findById(req.params.id).populate('subjects', 'name');
    if (!grade) {
      return res.status(404).json({ success: false, msg: 'Grade not found' });
    }
    res.status(200).json({ success: true, data: grade });
  } catch (error) {
    res.status(400).json({ success: false, msg: error.message });
  }
};

exports.updateGrade = async (req, res) => {
  try {
    const grade = await Grade.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!grade) {
      return res.status(404).json({ success: false, msg: 'Grade not found' });
    }
    res.status(200).json({ success: true, data: grade });
  } catch (error) {
    res.status(400).json({ success: false, msg: error.message });
  }
};

exports.deleteGrade = async (req, res) => {
  try {
    const grade = await Grade.findByIdAndDelete(req.params.id);
    if (!grade) {
      return res.status(404).json({ success: false, msg: 'Grade not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, msg: error.message });
  }
};
