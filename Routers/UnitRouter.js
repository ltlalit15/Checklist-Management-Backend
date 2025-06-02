import express from "express";
import upload from "../Middewares/Cloudinary.js";  

import { getAllUnits, addUnits,getallbranchcode ,geteconomicnumber,updateUnits,deleteUnits} from "../Controllers/UnitCtrl.js";
import { authMiddleware } from "../Middewares/authMiddleware.js";

const router = express.Router();

router.get("/unit",  authMiddleware, getAllUnits);
router.get("/getallbranchcode",  authMiddleware, getallbranchcode);
router.get("/geteconomicnumber",  authMiddleware, geteconomicnumber);
router.post(
  "/unit",
  authMiddleware,
  upload.fields([
    { name: "insuranceUpload", maxCount: 1 },
    { name: "vehicleCardUpload", maxCount: 1 },
  ]),
  addUnits
);
router.put(
  "/unit/:id",
  authMiddleware,
  upload.fields([
    { name: "insuranceUpload", maxCount: 1 },
    { name: "vehicleCardUpload", maxCount: 1 },
  ]),
  updateUnits
);
router.delete("/unit/:id", authMiddleware, deleteUnits);
export default router;
