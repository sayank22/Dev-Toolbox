// server.js - Complete with simple routes
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

console.log('🔧 Starting server with MongoDB...');

// Parse allowed origins
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : ['http://localhost:5173'];

console.log('🌐 Allowed Origins:', allowedOrigins);

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parser
app.use(bodyParser.json());

// Test routes
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.get('/test', (req, res) => {
  res.json({ message: 'Server working!' });
});

// Add API routes
console.log('🔄 Loading API routes...');
try {
  const apiRoutes = require('./routes/api');
  app.use('/api', apiRoutes);
  console.log('✅ API routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading API routes:', error.message);
}

// Connect to MongoDB (remove deprecated options)
console.log('🔄 Connecting to MongoDB...');
mongoose.connect(MONGO_URI)
.then(() => {
  console.log('✅ MongoDB connected');
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`✅ Test: http://localhost:${PORT}/test`);
  console.log(`✅ Health: http://localhost:${PORT}/health`);
  console.log(`✅ API Test: http://localhost:${PORT}/api/test`);
});

console.log('✅ Server setup complete');