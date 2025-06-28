import express from "express";
import { getChecklistPerBranchReport, FilledChecklistByBranchId,checklistperroute ,getChecklistPerBranchReportanswerReport} from "../Controllers/ReportCtrl.js";

const router = express.Router();

router.get("/checklistperbranch", getChecklistPerBranchReport);
router.get("/checklistperroute", checklistperroute);
router.get("/checklistanswerreportunit", getChecklistPerBranchReportanswerReport);
router.post("/FilledChecklistByBranchId", FilledChecklistByBranchId);

export default router;
