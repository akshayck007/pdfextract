import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to db");
  } catch (error) {
    console.log("ERROR CONNECTING TO MONGODB: ", error);
  }
};

export default connectDB;
