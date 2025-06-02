import express from "express";
import { checklistperroute} from "../Controllers/CheckListPerRouteCtrl.js";
import { authMiddleware } from "../Middewares/authMiddleware.js";

const router = express.Router();

router.get("/checklistperroute", checklistperroute);

export default router;
