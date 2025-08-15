import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log("Connecting to:", process.env.MONGO_URI);
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('DB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;
