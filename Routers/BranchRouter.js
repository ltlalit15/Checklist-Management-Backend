import express from "express";
import { getallbranch, addbranch ,getbranchname,deletebranch,updatebranch} from "../Controllers/BranchCtrl.js";
import { authMiddleware } from "../Middewares/authMiddleware.js";

const router = express.Router();

router.get("/branch", authMiddleware, getallbranch);
router.get("/getbranchname", authMiddleware, getbranchname);
router.post("/branch", authMiddleware, addbranch);
router.put("/branch/:id", authMiddleware, updatebranch);
router.delete("/branch/:id", authMiddleware, deletebranch);

export default router;
