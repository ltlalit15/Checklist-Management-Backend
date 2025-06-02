import express from "express";
import { getAllRoute, addRoute,updateRoute,deleteRoute } from "../Controllers/RouteCtrl.js";
import { authMiddleware } from "../Middewares/authMiddleware.js";

const router = express.Router();

router.get("/route", authMiddleware, getAllRoute);
router.post("/route", authMiddleware, addRoute);
router.put("/route/:id", authMiddleware, updateRoute);
router.delete("/route/:id", authMiddleware, deleteRoute);

export default router;
