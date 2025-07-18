// backend/app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: 'https://user-rewarder.vercel.app', 
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

app.use('/api', userRoutes);

module.exports = app;
