const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from server/.env
dotenv.config();

// If MONGODB_URI wasn't set, try loading repo root .env as a fallback
if (!process.env.MONGODB_URI) {
  const rootEnvPath = path.resolve(__dirname, '../.env');
  const result = dotenv.config({ path: rootEnvPath });
  if (result.error) {
    console.warn('No env loaded from root .env');
  } else {
    console.log('Loaded env from', rootEnvPath);
  }
}

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const bikeRoutes = require('./routes/bikes');
const bookingRoutes = require('./routes/bookings');
const reviewRoutes = require('./routes/reviews');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bikes', bikeRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB
console.log('MONGODB_URI set?', !!process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

// Graceful shutdown: close mongoose connection on exit signals
const gracefulShutdown = async (signal) => {
  try {
    console.log(`\nReceived ${signal} - closing MongoDB connection...`);
    await mongoose.disconnect();
    console.log('MongoDB connection closed.');
  } catch (err) {
    console.error('Error during MongoDB disconnect:', err);
  } finally {
    // allow process to exit
    process.exit(0);
  }
};

// Handle various termination signals
process.once('SIGINT', () => gracefulShutdown('SIGINT'));
process.once('SIGTERM', () => gracefulShutdown('SIGTERM'));
// nodemon restart
process.once('SIGUSR2', () => {
  gracefulShutdown('SIGUSR2').then(() => process.kill(process.pid, 'SIGUSR2'));
});

// Catch unhandled exceptions and disconnect before exiting
process.on('uncaughtException', async (err) => {
  console.error('Uncaught Exception:', err);
  await gracefulShutdown('uncaughtException');
});

// Catch unhandled promise rejections
process.on('unhandledRejection', async (reason) => {
  console.error('Unhandled Rejection:', reason);
  await gracefulShutdown('unhandledRejection');
});
