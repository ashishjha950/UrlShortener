import mongoose from "mongoose";

const dbConnection = () => {
  try {
    mongoose.connect(process.env.DATABASE_URL);
    console.log('database connected');
  } catch (err) {
    console.log('error occurred in database connection', err);
  }
}

export default dbConnection;
