// backend/routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const User = require('../models/User');

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid mail' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid password' });
    }

      sendTokenResponse(user, 200, res);

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});


const sendTokenResponse = async (user, codeStatus, res) => {
  const token = await user.getJwtToken();
  res
      .status(codeStatus)
      .cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true })
      .json({
          success: true,
          "token" : token
      })
}


// @route   GET /api/auth/user
// @desc    Get user data
// @access  Private
// router.get('/user', authMiddleware, async (req, res) => {
//   try {
//     // Use populate to retrieve course details based on the stored references
//     const user = await User.findById(req.user.id).populate('courses').select('-password');

//     res.json(user);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server Error');
//   }
// });



router.get('/logout', (req, res) => {
  console.log("Logout successful");

  // Clear the cookie and send a JSON response
  res.clearCookie('token');
  res.status(200).json({
    success: true,
    message: "logged out",
  });
});


module.exports = router;
