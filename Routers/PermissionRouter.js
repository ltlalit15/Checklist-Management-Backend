import express from "express";
import { getPermission, createmenuPermission,assignPermissions,removePermissions ,createsubmenuPermission} from "../Controllers/SidebarCtrl.js";
import { authMiddleware } from "../Middewares/authMiddleware.js";

const router = express.Router();

router.get("/permission", getPermission);
router.post("/create-menupermission", createmenuPermission);
router.post("/create-submenupermission", createsubmenuPermission);
router.put("/assign-permission/:roleId", assignPermissions);
router.delete("/remove-permission/:roleId", removePermissions);

export default router;
