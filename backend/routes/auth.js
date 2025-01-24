const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Stats = require('../models/userStats');
const dotenv = require('dotenv');
dotenv.config();
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const Razorpay = require('razorpay');

// Signup Route
router.post('/signup', async (req, res) => {
  const { name, email, password, dateofbirth } = req.body;


  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      dateofbirth: dateofbirth
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, message: 'Login successful' });

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Google route
router.post('/google', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { name, email } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email, isGoogleSignIn: true });
      await user.save();
    }

    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token: jwtToken });
  } catch (error) {
    res.status(401).json({ message: 'Invalid Google token' });
  }
});

// fetch user data
router.get('/userdata/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send('User not found.');
    }
    res.json(user);
  }
  catch (error) {
    res.status(500).send('Server Error');
  }
});

// fetch user stats
router.post('/userstats', async (req, res) => {
  const { email, age, height, weight } = req.body
  try {
    let user = await Stats.findOne({ email });
    if (!user) {
      user = await Stats.create({
        email: email,
        age: age,
        height: height,
        weight: weight,
        streakDates: [],
      });
    }

    res.json(user);
  }
  catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// update user stats
router.post('/userstats/update', async (req, res) => {
  const { email, age, height, weight, run, strength, cardio } = req.body
  try {
    const today = new Date().toISOString().slice(0, 10); // Format YYYY-MM-DD
    const user = await Stats.findOneAndUpdate(
      { email }, // Find the user by email
      {
        $set: { age, height, weight, running: run, muscletrain: strength, cardio: cardio },
        $addToSet: { streakDates: today }, // Add today's date if not already present
      },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Updated successfully', streakDates: user.streakDates });

  }
  catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Payment route
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});
router.post('/payment', async (req, res) => {
  const { amount, currency = 'INR' } = req.body;
  try {
    const options = {
      amount: amount * 100, // Amount in paise 
      currency: currency,
      receipt: 'order_rcptid_11'
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  }
  catch (error) {
    res.status(500).send('Error creating payment order');
  }
});

module.exports = router;