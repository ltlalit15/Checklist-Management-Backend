import express from "express";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
import {
  createuser,
  loginAdmin,
  editUser,
  deleteUser,
  getAllUser,
  getAllUserData,
  toogleStatus
} from "../Controllers/DriverCtrl.js";
import { uploadSingleImageToCloudinary } from "../Middewares/singleImgUpload.js";
const router = express.Router();

router.post("/login", loginAdmin);
router.post("/create-driver", upload.single('profileimage'), uploadSingleImageToCloudinary, createuser);
router.put("/editdriver/:id", upload.single('profileimage'), uploadSingleImageToCloudinary, editUser);
router.delete("/deletedriver/:id", deleteUser);
router.get("/getalldriver", getAllUser);
router.get("/getalldriverdata", getAllUserData);
router.patch("/toogleStatus/:id", toogleStatus);

export default router;
