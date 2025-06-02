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
  getAllUserData
} from "../Controllers/AuthCtrl.js";
import { uploadSingleImageToCloudinary } from "../Middewares/singleImgUpload.js";
const router = express.Router();

router.post("/login", loginAdmin);
router.post("/signup", upload.single('profileimage'), uploadSingleImageToCloudinary, createuser);
router.put("/edituser/:id", upload.single('profileimage'), uploadSingleImageToCloudinary, editUser);
router.delete("/deleteuser/:id", deleteUser);
router.get("/getalluser", getAllUser);
router.get("/getalluserdata", getAllUserData);

export default router;
