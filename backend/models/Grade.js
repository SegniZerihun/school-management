// school-management/backend/models/Grade.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GradeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  subjects: [{
    type: Schema.Types.ObjectId,
    ref: 'Subject'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Grade', GradeSchema);
