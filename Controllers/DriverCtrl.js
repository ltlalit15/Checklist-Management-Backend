import Schema from "../Models/DriverModel.js";
import User from "../Models/UserModel.js";
import Role from "../Models/RoleModel.js";
import mongoose from "mongoose";
import Permission from "../Models/PermissionModel.js";
import asyncHandler from "express-async-handler";
import { generateToken } from "../Config/jwtToken.js";
import bcrypt from "bcrypt";
import { isValidObjectId } from "../Utills/isValidObjectId.js";

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
    const users = await Schema.find({}).select("-password");
    res.status(200).json({ data: users, message: "Users fetched successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

export const toogleStatus = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params
    const { driverStatus } = req.body
    const data = await User.findByIdAndUpdate(
      id,
      { driverStatus },
      { new: true }
    )
    res.status(200).json({ message: "Status Updated Sucessfully!", success: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });

  }
})
