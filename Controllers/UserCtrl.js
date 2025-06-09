import Schema from "../Models/UserModel.js";
import Role from "../Models/RoleModel.js";

import DriverSchema from "../Models/DriverModel.js";
import asyncHandler from "express-async-handler";
import { generateToken } from "../Config/jwtToken.js";
import bcrypt from "bcrypt";
import { isValidObjectId } from "../Utills/isValidObjectId.js";

export const createuser = asyncHandler(async (req, res) => {
  const existingUser = await Schema.findOne({ username: req.body.username });

  if (existingUser) {
    return res.status(409).json({ message: "Username already exists", success: false });
  }

  const data = await Schema.create(req.body);
  res.status(200).json({ data, message: "User created successfully", success: true });
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
    const users = await Schema.find({}).select("-password") .populate('role', 'roleName') // populate role field but only roleName
  .exec();;
    res.status(200).json({ data: users, message: "Users fetched successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

export const getProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid ID format", success: false });
  }

  try {
    const user = await Schema.findById(id).select("-password").populate('role', 'roleName');

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const driver = await DriverSchema.findOne({ userId: id });
    if (driver) {
      user.driverDetails = driver;
    }

    // Transform role object
    let userObj = user.toObject(); // convert Mongoose doc to plain JS object

    if (userObj.role) {
      userObj.roleId = userObj.role._id;
      userObj.role = userObj.role.roleName;
      delete userObj.role; // remove nested role object
    }

    res.status(200).json({ data: userObj, message: "User profile fetched successfully", success: true });

  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});
