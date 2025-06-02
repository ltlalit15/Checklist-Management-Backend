import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connected Successfully ✅✅✅✅");
  } catch (error) {
    console.error("Database error ❌❌❌❌", error);
  }
};

