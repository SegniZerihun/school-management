// school-management/backend/controllers/userController.js

const User = require('../models/User');
const Grade = require('../models/Grade'); // <-- Add this line
const bcrypt = require('bcryptjs');

exports.getUsersByRole = async (req, res) => {
  try {
    const { role } = req.query;
    const query = role ? { role } : {};
    // Populate the 'grade' field to get the grade name
    const users = await User.find(query).populate('grade', 'name').select('-password');
    res.json({ success: true, count: users.length, data: users });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Server error', error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role, grade } = req.body;

    // Include 'grade' in the fields to be updated
    const updatedFields = { name, email, role, grade };

    // If grade is an empty string, it should be unset
    if (grade === '' || grade === null) {
        updatedFields.grade = undefined;
    }


    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedFields.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, { $set: updatedFields }, { new: true }).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, msg: 'User not found' });
    }

    res.json({ success: true, msg: 'User updated', data: user });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Server error', error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ success: false, msg: 'User not found' });
    }
    res.json({ success: true, msg: 'User deleted', data: {} });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Server error', error: err.message });
  }
};

// ---> ADD THIS NEW FUNCTION AT THE END OF THE FILE <---
exports.getTeacherDashboardData = async (req, res) => {
  try {
    // The teacher's own info is in req.user from the 'protect' middleware
    const teacher = await User.findById(req.user.id);
    if (!teacher || !teacher.grade) {
      return res.status(400).json({ success: false, msg: 'Teacher is not assigned to a grade.' });
    }

    // Find students in the same grade as the teacher
    const students = await User.find({ role: 'Student', grade: teacher.grade }).select('name email');

    // Find the grade and populate its subjects
    const grade = await Grade.findById(teacher.grade).populate('subjects', 'name');
    const subjects = grade ? grade.subjects : [];

    res.status(200).json({
      success: true,
      data: {
        students,
        subjects
      }
    });

  } catch (err) {
    res.status(500).json({ success: false, msg: 'Server error', error: err.message });
  }
};
