const mongoose = require('mongoose');

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  const options = {
    serverSelectionTimeoutMS: 5000,  
    socketTimeoutMS: 45000,         
    connectTimeoutMS: 5000,         
    maxPoolSize: 10,              
    minPoolSize: 1,              
    retryWrites: true,             
    retryReads: true               
  };

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, options);
    
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      cachedConnection = null;
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
      cachedConnection = null;
    });

    // Cache the connection
    cachedConnection = connection;
    console.log('MongoDB connected successfully');
    return connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    cachedConnection = null;
    throw error; // Rethrow to handle in the Lambda function
  }
};


module.exports = connectDB;
