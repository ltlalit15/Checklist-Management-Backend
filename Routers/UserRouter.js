import express from "express";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
import {
  createuser,
  editUser,
  deleteUser,
  getAllUser,
  getAllUserData
} from "../Controllers/UserCtrl.js";
import { uploadSingleImageToCloudinary } from "../Middewares/singleImgUpload.js";
const router = express.Router();

router.post("/create-user", upload.single('profileimage'), uploadSingleImageToCloudinary, createuser);
router.put("/edituser/:id", upload.single('profileimage'), uploadSingleImageToCloudinary, editUser);
router.delete("/deleteuser/:id", deleteUser);
router.get("/getalluser", getAllUser);
router.get("/getalluserdata", getAllUserData);

export default router;
