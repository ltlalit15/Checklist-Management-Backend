import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConnect = async () => {
  try {
    console.log("process.env.MONGODB_URL", process.env.MONGODB_URL);
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected Successfully ✅✅✅✅");
  } catch (error) {
    console.error("Database error ❌❌❌❌", error.message);
  }
};
