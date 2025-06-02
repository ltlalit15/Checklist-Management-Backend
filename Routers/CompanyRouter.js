import express from "express";
import { getallCompany, addCompany,getallCompanyName ,updateCompany,deleteCompany} from "../Controllers/CompanyCtrl.js";
import { authMiddleware } from "../Middewares/authMiddleware.js";

const router = express.Router();

router.get("/insurance-company", authMiddleware, getallCompany);
router.get("/getallcompany", authMiddleware, getallCompanyName);
router.post("/insurance-company", authMiddleware, addCompany);
router.put("/insurance-company/:id", authMiddleware, updateCompany);
router.delete("/insurance-company/:id", authMiddleware, deleteCompany);

export default router;
