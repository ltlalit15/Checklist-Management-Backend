import Schema from "../Models/DriverModel.js";
import Driver from "../Models/DriverModel.js";
import User from "../Models/UserModel.js";
import Role from "../Models/RoleModel.js";
import mongoose from "mongoose";
import Branch from "../Models/BranchModel.js"
import Permission from "../Models/PermissionModel.js";
import asyncHandler from "express-async-handler";
import { generateToken } from "../Config/jwtToken.js";
import bcrypt from "bcrypt";
import { isValidObjectId } from "../Utills/isValidObjectId.js";
import routeModel from "../Models/RouteModels.js";

export const createuser = asyncHandler(async (req, res) => {
  try {
    const username = await Schema.findOne({ username: req.body.username });

    if (!username) {
      const img = req.uploadedImageUrl;

      const data = await Schema.create({
        ...req.body,
        profileimage: img,
      });

      res.status(200).json({ message: "User created successfully", success: true, data });
    } else {
      res.status(409).json({ message: "Username already exists", success: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

export const loginAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  let foundUser = await Schema.findOne({ username });
  let role = "driver";

  if (!foundUser) {
    foundUser = await User.findOne({ username });

    if (!foundUser) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    role = foundUser.role;
  }

  // if (foundUser.driverStatus !== true) {
  //   return res.status(403).json({ message: "Permission denied. User is inactive." });
  // }
  const isPasswordMatch = await bcrypt.compare(password, foundUser.password);
  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const user = foundUser.toObject();
  delete user.password;
  delete user.createdAt;
  delete user.updatedAt;
  delete user.__v;

  const token = generateToken(foundUser._id);
  console.log(foundUser._id, "foundUser._id");
  const userRole = await Role.findOne({ _id: new mongoose.Types.ObjectId(foundUser.role) });
  console.log("userRole", userRole);
  res.status(200).json({
    message: "Login successful",
    roleId: userRole ? userRole._id : null,
    roleName: userRole ? userRole.roleName : role,
    user,
    token,
  });
});

export const editUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid ID format", success: false });
  }
  try {
    const updatedData = {
      ...req.body,
    };

    console.log("req.body", req.body);
    if (req.uploadedImageUrl) {
      updatedData.profileimage = req.uploadedImageUrl;
    }

    const updatedUser = await Schema.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    res.status(200).json({ data: updatedUser, message: "User updated successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await Schema.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    res.status(200).json({ message: "User deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

export const getAllUser = asyncHandler(async (req, res) => {
  try {
    const users = await Schema.find({}).select("username id");
    res.status(200).json({ data: users, message: "Users fetched successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
}
);

export const getAllUserData = asyncHandler(async (req, res) => {
  try {
    // All users excluding password
    const allUsers = await Schema.find({}).select("-password");

    // All drivers with specific role (exclude password)
    const drivers = await User.find({ role: "6858e65fefc7bf2dc8863662" }).select("-password");

    // Merge both arrays
    const mergedUsers = [...allUsers, ...drivers];

    res.status(200).json({
      success: true,
      message: "Users and drivers fetched successfully",
      data: mergedUsers, // 👈 merged single array
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export const getdriverByBranch = asyncHandler(async (req, res) => {
  try {
    const { branchIds } = req.body; // Expecting: { branchIds: ["id1", "id2", ...] }

    if (!branchIds || !Array.isArray(branchIds)) {
      return res.status(400).json({
        success: false,
        message: "branchIds must be an array",
      });
    }

    // Step 1: Find routes where branchCode is in the provided branchIds
    const routes = await routeModel.find({ branchCode: { $in: branchIds } });

    // Step 2: Extract driver IDs
    const driverIds = routes.map(route => route.username);

    // Step 3: Find drivers and users with matching _ids
    const drivers = await Schema.find({ _id: { $in: driverIds } });
    const users = await User.find({ _id: { $in: driverIds } });

    // Merge and remove duplicates if needed
    const mergedUsers = [...users, ...drivers];

    res.status(200).json({
      success: true,
      count: mergedUsers.length,
      data: mergedUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});



export const toogleStatus = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { driverStatus } = req.body;

    // Step 1: Try to update in User
    let data = await User.findByIdAndUpdate(id, { driverStatus }, { new: true });

    // Step 2: If not found in User, try in Driver
    if (!data) {
      data = await Driver.findByIdAndUpdate(id, { driverStatus }, { new: true });
    }

    // Step 3: If still not found, return error
    if (!data) {
      return res.status(404).json({ message: "User or Driver not found", success: false });
    }

    // Step 4: Return updated data
    res.status(200).json({ message: "Status Updated Successfully!", success: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

