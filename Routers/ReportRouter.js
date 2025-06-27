// routes/reportRoutes.js
import express from "express";
import { checkListPerBranch , FilledChecklistByIds} from "../Controllers/ReportCtrl.js";

const router = express.Router();

router.get("/checklistperbranch", checkListPerBranch);
router.post("/FilledChecklistByIds", FilledChecklistByIds);

export default router;
