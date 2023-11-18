const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

// Route for applying to a course
router.post('/apply', authMiddleware, async (req, res) => {
  console.log('Authenticated User:', req.user);

  const { courseId } = req.body;

  try {
    const userId = req.user.id;

     const user = await User.findOne({ _id: userId, 'courses.courseId': courseId });

    if (user) {
      // If the courseId is already present, return an error
      return res.status(400).json({ error: 'Already applied for the course.' });
    }
    // Associate the course ID with the user
    await User.findByIdAndUpdate(userId, { $push: { courses: { courseId: courseId.toString() } } });

    res.json({ message: 'Successfully applied for the course.' });
  } catch (error) {
    console.error('Error applying for the course:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
