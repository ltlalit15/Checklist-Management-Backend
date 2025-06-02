import Schema from "../Models/AuthModel.js";
import Permission from "../Models/PermissionModel.js";
import asyncHandler from "express-async-handler";
import { generateToken } from "../Config/jwtToken.js";
import bcrypt from "bcrypt";
import { isValidObjectId } from "../Utills/isValidObjectId.js";

export const createuser = asyncHandler(async (req, res) => {
  try {
    const username = await Schema.findOne({ username: req.body.username });

    if (!username) {
      const img = req.uploadedImageUrl
      const data = await Schema.create({
        ...req.body,
        profileimage: img,
      });

      const permission = [
        {
          "_id": "683d725cbcb71900b5cb2154",
          "sidebarId": { "_id": "683d7168bcb71900b5cb2143", "sidebarName": "Vehicle Management" },
          "subSidebar": "Insurance",
          "userId": "663a125ec324210015b222aa",
          "isEdit": false,
          "isDelete": false,
          "isCreate": false,
          "isGet": true
        },
        {
          "_id": "683d941cbcb71900b5cb216c",
          "sidebarId": { "_id": "683d7168bcb71900b5cb2143", "sidebarName": "Vehicle Management" },
          "subSidebar": "vehicleType",
          "userId": "663a125ec324210015b222aa",
          "isEdit": false,
          "isDelete": false,
          "isCreate": false,
          "isGet": true
        },
        {
          "_id": "683d947fbcb71900b5cb216f",
          "sidebarId": { "_id": "683d7168bcb71900b5cb2143", "sidebarName": "Vehicle Management" },
          "subSidebar": "vehicleDivision",
          "userId": "663a125ec324210015b222aa",
          "isEdit": false,
          "isDelete": false,
          "isCreate": false,
          "isGet": true
        },
        {
          "_id": "683d949fbcb71900b5cb2170",
          "sidebarId": { "_id": "683d7168bcb71900b5cb2143", "sidebarName": "Vehicle Management" },
          "subSidebar": "vehicle",
          "userId": "663a125ec324210015b222aa",
          "isEdit": false,
          "isDelete": false,
          "isCreate": false,
          "isGet": true
        },
        {
          "_id": "683d963abcb71900b5cb2174",
          "sidebarId": { "_id": "683d7168bcb71900b5cb2144", "sidebarName": "Employee Management" },
          "subSidebar": "Position",
          "userId": "663a125ec324210015b222aa",
          "isEdit": false,
          "isDelete": false,
          "isCreate": false,
          "isGet": true
        },
        {
          "_id": "683d9653bcb71900b5cb2175",
          "sidebarId": { "_id": "683d7168bcb71900b5cb2144", "sidebarName": "Employee Management" },
          "subSidebar": "Department",
          "userId": "663a125ec324210015b222aa",
          "isEdit": false,
          "isDelete": false,
          "isCreate": false,
          "isGet": true
        },
        {
          "_id": "683d965cbcb71900b5cb2176",
          "sidebarId": { "_id": "683d7168bcb71900b5cb2144", "sidebarName": "Employee Management" },
          "subSidebar": "Driver",
          "userId": "663a125ec324210015b222aa",
          "isEdit": false,
          "isDelete": false,
          "isCreate": false,
          "isGet": true
        },
        {
          "_id": "683d966ebcb71900b5cb2177",
          "sidebarId": { "_id": "683d7168bcb71900b5cb2144", "sidebarName": "Employee Management" },
          "subSidebar": "DriverList",
          "userId": "663a125ec324210015b222aa",
          "isEdit": false,
          "isDelete": false,
          "isCreate": false,
          "isGet": true
        },
        {
          "_id": "683d9689bcb71900b5cb2178",
          "sidebarId": { "_id": "683d7168bcb71900b5cb2145", "sidebarName": "Routes" },
          "subSidebar": "addRoute",
          "userId": "663a125ec324210015b222aa",
          "isEdit": false,
          "isDelete": false,
          "isCreate": false,
          "isGet": true
        },
        {
          "_id": "683d96c8bcb71900b5cb217a",
          "sidebarId": { "_id": "683d7168bcb71900b5cb2145", "sidebarName": "Routes" },
          "subSidebar": "RouteList",
          "userId": "663a125ec324210015b222aa",
          "isEdit": false,
          "isDelete": false,
          "isCreate": false,
          "isGet": true
        },
        {
          "_id": "683d9784bcb71900b5cb217d",
          "sidebarId": { "_id": "683d7168bcb71900b5cb2146", "sidebarName": "Checklist" },
          "subSidebar": "createChecklist",
          "userId": "663a125ec324210015b222aa",
          "isEdit": false,
          "isDelete": false,
          "isCreate": false,
          "isGet": true
        },
        {
          "_id": "683d9784bcb71900b5cb218e",
          "sidebarId": { "_id": "683d7168bcb71900b5cb2146", "sidebarName": "Checklist" },
          "subSidebar": "Checklist",
          "userId": "663a125ec324210015b222aa",
          "isEdit": false,
          "isDelete": false,
          "isCreate": false,
          "isGet": true
        },
        {
          "_id": "683d97e7bcb71900b5cb217f",
          "sidebarId": { "_id": "683d7168bcb71900b5cb2147", "sidebarName": "Reports" },
          "subSidebar": "BranchChecklist",
          "userId": "663a125ec324210015b222aa",
          "isEdit": false,
          "isDelete": false,
          "isCreate": false,
          "isGet": true
        },
        {
          "_id": "683d9839bcb71900b5cb2180",
          "sidebarId": { "_id": "683d7168bcb71900b5cb2147", "sidebarName": "Reports" },
          "subSidebar": "RouteChecklist",
          "userId": "663a125ec324210015b222aa",
          "isEdit": false,
          "isDelete": false,
          "isCreate": false,
          "isGet": true
        },
        {
          "_id": "683d9854bcb71900b5cb2181",
          "sidebarId": { "_id": "683d7168bcb71900b5cb2147", "sidebarName": "Reports" },
          "subSidebar": "EconomicunitChecklist",
          "userId": "663a125ec324210015b222aa",
          "isEdit": false,
          "isDelete": false,
          "isCreate": false,
          "isGet": true
        },
        {
          "_id": "683d986abcb71900b5cb2182",
          "sidebarId": { "_id": "683d7168bcb71900b5cb2147", "sidebarName": "Reports" },
          "subSidebar": "AnswerChecklist",
          "userId": "663a125ec324210015b222aa",
          "isEdit": false,
          "isDelete": false,
          "isCreate": false,
          "isGet": true
        },
        {
          "_id": "683d98acbcb71900b5cb2183",
          "sidebarId": { "_id": "683d7168bcb71900b5cb2148", "sidebarName": "User Interface" },
          "subSidebar": "UserList",
          "userId": "663a125ec324210015b222aa",
          "isEdit": false,
          "isDelete": false,
          "isCreate": false,
          "isGet": true
        },
        {
          "_id": "683d98ccbcb71900b5cb2184",
          "sidebarId": { "_id": "683d7168bcb71900b5cb2148", "sidebarName": "User Interface" },
          "subSidebar": "CreateUser",
          "userId": "663a125ec324210015b222aa",
          "isEdit": false,
          "isDelete": false,
          "isCreate": false,
          "isGet": true
        }
      ]
      await Permission.create(permission);
      res.status(200).json({ data, message: "User created successfully", success: true });
    } else {
      res.status(409).json({ message: "Username already exists", success: false });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export const loginAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  console.log("Login request body:", req.body);
  const findUser = await Schema.findOne({ username });
  console.log("findUser", findUser);
  if (!findUser) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const isPasswordMatch = await bcrypt.compare(password, findUser.password);
  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = generateToken(findUser._id);
  const user = findUser.toObject();
  delete user.password, user.createdAt, user.updatedAt, user.__v;
  res.status(200).json({ message: "Login successful", user, token });

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