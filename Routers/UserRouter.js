import express from "express";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
import {
  createuser,
  editUser,
  deleteUser,
  getAllUser,
  getAllUserData,
  getProfile
} from "../Controllers/UserCtrl.js";
const router = express.Router();

router.post("/create-user", createuser);
router.put("/edituser/:id", editUser);
router.delete("/deleteuser/:id", deleteUser);
router.get("/getalluser", getAllUser);
router.get("/getalluserdata", getAllUserData);
router.get("/profile/:id", getProfile);

export default router;
