import express from "express";
import { getalldepartment, adddepartment,deletedepartment,updatedepartment} from "../Controllers/DepartmentCtrl.js";
import { authMiddleware } from "../Middewares/authMiddleware.js";

const router = express.Router();

router.get("/department", getalldepartment);
router.post("/department", adddepartment);
router.put("/department/:id", updatedepartment);
router.delete("/department/:id", deletedepartment);

export default router;
