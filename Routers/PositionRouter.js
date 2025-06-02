import express from "express";
import { getallposition, addposition,deleteposition,updateposition} from "../Controllers/PositionCtrl.js";
import { authMiddleware } from "../Middewares/authMiddleware.js";

const router = express.Router();

router.get("/position", getallposition);
router.post("/position", addposition);
router.put("/position/:id", updateposition);
router.delete("/position/:id", deleteposition);

export default router;
