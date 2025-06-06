import express from "express";
import { getDashboardData, } from "../Controllers/DashboardCtrl.js";

const router = express.Router();

router.get("/dashboard", getDashboardData);

export default router;
