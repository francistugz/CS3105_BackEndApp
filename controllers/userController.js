const users = require('../models/userModel');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

// Validation schema for registration and login
const schema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required()
});

// Register User
const registerUser = (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { username, password, email } = req.body;

  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = {
    id: users.length + 1,
    username,
    password, // Store hashed password in a real scenario
    email
  };

  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully' });
};

// Login User
const loginUser = (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id }, 'secretKey', { expiresIn: '1h' });
  res.status(200).json({ message: 'Login successful', token });
};


const getUserProfile = (req, res) => {
  const user = users.find(u => u.id === req.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.status(200).json({ id: user.id, username: user.username, email: user.email });
};

module.exports = { registerUser, loginUser, getUserProfile };
