import express from "express";
import { getRoleWithPermissions , createRole ,editRole , deleteRole , getPermissionByRoleId , editPermissionById} from "../Controllers/RoleCtrl.js";
import { authMiddleware } from "../Middewares/authMiddleware.js";

const router = express.Router();

router.get("/roles", getRoleWithPermissions );
router.post("/create-role", createRole);
router.patch("/edit-role/:id", editRole);
router.delete("/delete-role/:id",deleteRole); 
router.get("/getpermissions/:roleId", getPermissionByRoleId);
router.put("/update-permission/:id", editPermissionById);

export default router;
