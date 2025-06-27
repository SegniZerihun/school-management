const Mark = require('../models/Mark');

exports.createOrUpdateMark = async (req, res) => {
  const { student, subject, marks } = req.body;

  try {
    const mark = await Mark.findOneAndUpdate(
      { student: student, subject: subject },
      { $set: { marks: marks } },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(201).json({ success: true, data: mark });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, msg: error.message });
  }
};

exports.getMarksForStudent = async (req, res) => {
  try {
    const marks = await Mark.find({ student: req.params.studentId })
      .populate('subject', 'name')
      .populate('student', 'name');

    if (!marks) {
      return res.status(404).json({ success: false, msg: 'No marks found for this student' });
    }

    res.status(200).json({ success: true, count: marks.length, data: marks });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, msg: error.message });
  }
};
