const mongoose = require('mongoose');

const connectDB = async () => {
  const options = {
    serverSelectionTimeoutMS: 5000,    // Reduce server selection timeout
    socketTimeoutMS: 45000,         
    connectTimeoutMS: 5000,         
    maxPoolSize: 10,              
    minPoolSize: 1,              
    retryWrites: true,             
    retryReads: true               
  };
  try {
    await mongoose.connect(process.env.MONGODB_URI,options);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = connectDB;