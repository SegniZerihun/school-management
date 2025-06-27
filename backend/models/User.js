// school-management/backend/models/User.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Admin', 'Teacher', 'Student'],
    default: 'Student'
  },
  grade: {
    type: Schema.Types.ObjectId,
    ref: 'Grade',
    required: false // Not all users (like Admin) will have a grade
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
