import { Router } from "express";
import UserRoutes from "./Routers/DriverRouters.js";
import BranchRouter from "./Routers/BranchRouter.js";
import UnitRouter from "./Routers/UnitRouter.js";
import RouteRouter from "./Routers/RouteRouters.js";
import CheckListRouter from "./Routers/CheckListRoute.js";
import ReportRouter from "./Routers/ReportRouter.js";
import RoleRouter from "./Routers/RoleRouter.js";
import VehicleTypeRouter from "./Routers/VehicleTypeRouter.js";
import VehicleDivisionRouter from "./Routers/VehicleDivisionRouter.js";
import VehicleRouter from "./Routers/VehicleRouter.js";
import InsuranceRouter from "./Routers/InsuranceRouter.js";
import PositionRouter from "./Routers/PositionRouter.js";
import DepartmentRouter from "./Routers/DepartmentRouter.js";
import UserRouter from "./Routers/UserRouter.js";
import DashboardRouter from "./Routers/DashboradRouter.js";
import VerifyOtpRouter from "./Routers/VerifyOtpRouter.js";

const router = Router();

router.use("/api", UserRoutes);
router.use("/api", BranchRouter);
router.use("/api", UnitRouter);
router.use("/api", RouteRouter);
router.use("/api", CheckListRouter);
router.use("/api", ReportRouter);
router.use("/api", RoleRouter);
router.use("/api", VehicleTypeRouter);
router.use("/api", VehicleDivisionRouter);
router.use("/api", VehicleRouter);
router.use("/api", InsuranceRouter);
router.use("/api", PositionRouter);
router.use("/api", DepartmentRouter);
router.use("/api", UserRouter);
router.use("/api", DashboardRouter);
router.use("/api", VerifyOtpRouter);

export default router;
