import express from "express";
import { getallcategory, addcategory ,getallcategoryName,deletecategory,updatecategory} from "../Controllers/CategoryCtrl.js";
import { authMiddleware } from "../Middewares/authMiddleware.js";

const router = express.Router();

router.get("/vehicle-category", authMiddleware, getallcategory);
router.get("/getallcategory", authMiddleware, getallcategoryName);
router.post("/vehicle-category", authMiddleware, addcategory);
router.put("/vehicle-category/:id", authMiddleware, updatecategory);
router.delete("/vehicle-category/:id", authMiddleware, deletecategory);

export default router;
