import express from "express";
import { getRoleWithPermissions , createRole ,editRole} from "../Controllers/RoleCtrl.js";
import { authMiddleware } from "../Middewares/authMiddleware.js";

const router = express.Router();

router.get("/roles", getRoleWithPermissions );
router.post("/create-role", createRole);
router.patch("/edit-role/:id", editRole);

export default router;
