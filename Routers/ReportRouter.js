// routes/reportRoutes.js
import express from "express";
import { checkListPerBranch } from "../Controllers/ReportCtrl.js";

const router = express.Router();

router.get("/checklistperbranch", checkListPerBranch);

export default router;
