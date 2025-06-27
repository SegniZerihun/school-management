const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

router.get(
  '/admin',
  protect,
  authorize('Admin'),
  (req, res) => {
    res.json({
      msg: `Welcome Admin ${req.user.name}, you have access! Your user ID is ${req.user.id}.`,
    });
  }
);

module.exports = router;
