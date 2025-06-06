import Driver from "../Models/DriverModel.js";
import User from "../Models/UserModel.js";
import Vehicle from "../Models/VehicleModel.js";
import CheckListPerRouteRouter from "../Models/CheckListModel.js";
import asyncHandler from 'express-async-handler';

export const getDashboardData = asyncHandler(async (req, res) => {
  try {
    const [driverCount, userCount, vehicleCount, checklistCount] = await Promise.all([
      Driver.countDocuments(),
      User.countDocuments(),
      Vehicle.countDocuments(),
      CheckListPerRouteRouter.countDocuments(),
    ]);

    res.status(200).json({
      driverCount,
      userCount,
      vehicleCount,
      checklistCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
