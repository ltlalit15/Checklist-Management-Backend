import express from "express";
import { getChecklistPerBranchReport, FilledChecklistByBranchId } from "../Controllers/ReportCtrl.js";

const router = express.Router();

router.get("/checklistperbranch", getChecklistPerBranchReport);
router.post("/FilledChecklistByBranchId", FilledChecklistByBranchId);

export default router;
