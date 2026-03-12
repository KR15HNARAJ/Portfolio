import mongoose from "mongoose";

export const connectDB = async () => {
  const { MONGO_URI } = process.env;
  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined.");
  }

  await mongoose.connect(MONGO_URI);
};

