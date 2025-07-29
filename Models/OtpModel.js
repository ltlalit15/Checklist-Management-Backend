import mongoose from "mongoose";

const otpLogSchema = new mongoose.Schema({
  mobileNumber: String,
  countryCode: String,
  verificationId: String,
  transactionId: String,
  timeout: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.model("Otp", otpLogSchema);
