import express from "express";
import { sendOtp, validateOtp } from "../Controllers/VerifyOtpCtrl.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.get("/validate-otp", validateOtp);

export default router;
