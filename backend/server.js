// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();
app.use(express.json());
app.use(cors());

// Define the port from environment variables or use a default
const PORT = process.env.PORT || 5000;

// Connect to MongoDB database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('SUCCESS: MongoDB connected.'))
  .catch(err => console.error('ERROR: MongoDB connection error:', err));

// A simple test route to check if the server is running
app.get('/', (req, res) => {
  res.send('API is alive!');
});


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/test', require('./routes/testRoutes'));
app.use('/api/subjects', require('./routes/subjectRoutes'));
app.use('/api/grades', require('./routes/gradeRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/marks', require('./routes/markRoutes'));

// Start listening for requests on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});