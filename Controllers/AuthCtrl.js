import Schema from "../Models/AuthModel.js";
import Permission from "../Models/PermissionModel.js";
import asyncHandler from "express-async-handler";
import { generateToken } from "../Config/jwtToken.js";
import bcrypt from "bcrypt";
import { isValidObjectId } from "../Utills/isValidObjectId.js";

export const createuser = asyncHandler(async (req, res) => {
  try {
    // Check if username already exists
    const username = await Schema.findOne({ username: req.body.username });

    if (!username) {
      // User profile image url jo middleware se aaya hai
      const img = req.uploadedImageUrl;

      // Naya user create karo
      const data = await Schema.create({
        ...req.body,
        profileimage: img,
      });

      // Permission template without fixed _id and userId
      const permissionTemplate = [
        {
          sidebarId: "683d7168bcb71900b5cb2143",
          subSidebar: "Insurance",
          isEdit: false,
          isDelete: false,
          isCreate: false,
          isGet: true,
        },
        {
          sidebarId: "683d7168bcb71900b5cb2143",
          subSidebar: "vehicleType",
          isEdit: false,
          isDelete: false,
          isCreate: false,
          isGet: true,
        },
        {
          sidebarId: "683d7168bcb71900b5cb2143",
          subSidebar: "vehicleDivision",
          isEdit: false,
          isDelete: false,
          isCreate: false,
          isGet: true,
        },
        {
          sidebarId: "683d7168bcb71900b5cb2143",
          subSidebar: "vehicle",
          isEdit: false,
          isDelete: false,
          isCreate: false,
          isGet: true,
        },
        {
          sidebarId: "683d7168bcb71900b5cb2144",
          subSidebar: "Position",
          isEdit: false,
          isDelete: false,
          isCreate: false,
          isGet: true,
        },
        {
          sidebarId: "683d7168bcb71900b5cb2144",
          subSidebar: "Department",
          isEdit: false,
          isDelete: false,
          isCreate: false,
          isGet: true,
        },
        {
          sidebarId: "683d7168bcb71900b5cb2144",
          subSidebar: "Driver",
          isEdit: false,
          isDelete: false,
          isCreate: false,
          isGet: true,
        },
        {
          sidebarId: "683d7168bcb71900b5cb2144",
          subSidebar: "DriverList",
          isEdit: false,
          isDelete: false,
          isCreate: false,
          isGet: true,
        },
        {
          sidebarId: "683d7168bcb71900b5cb2145",
          subSidebar: "addRoute",
          isEdit: false,
          isDelete: false,
          isCreate: false,
          isGet: true,
        },
        {
          sidebarId: "683d7168bcb71900b5cb2145",
          subSidebar: "RouteList",
          isEdit: false,
          isDelete: false,
          isCreate: false,
          isGet: true,
        },
        {
          sidebarId: "683d7168bcb71900b5cb2146",
          subSidebar: "createChecklist",
          isEdit: false,
          isDelete: false,
          isCreate: false,
          isGet: true,
        },
        {
          sidebarId: "683d7168bcb71900b5cb2146",
          subSidebar: "Checklist",
          isEdit: false,
          isDelete: false,
          isCreate: false,
          isGet: true,
        },
        {
          sidebarId: "683d7168bcb71900b5cb2147",
          subSidebar: "BranchChecklist",
          isEdit: false,
          isDelete: false,
          isCreate: false,
          isGet: true,
        },
        {
          sidebarId: "683d7168bcb71900b5cb2147",
          subSidebar: "RouteChecklist",
          isEdit: false,
          isDelete: false,
          isCreate: false,
          isGet: true,
        },
        {
          sidebarId: "683d7168bcb71900b5cb2147",
          subSidebar: "EconomicunitChecklist",
          isEdit: false,
          isDelete: false,
          isCreate: false,
          isGet: true,
        },
        {
          sidebarId: "683d7168bcb71900b5cb2147",
          subSidebar: "AnswerChecklist",
          isEdit: false,
          isDelete: false,
          isCreate: false,
          isGet: true,
        },
        {
          sidebarId: "683d7168bcb71900b5cb2148",
          subSidebar: "UserList",
          isEdit: false,
          isDelete: false,
          isCreate: false,
          isGet: true,
        },
        {
          sidebarId: "683d7168bcb71900b5cb2148",
          subSidebar: "CreateUser",
          isEdit: false,
          isDelete: false,
          isCreate: false,
          isGet: true,
        },
      ];

      // Dynamically set userId for all permissions
      const permission = permissionTemplate.map((perm) => ({
        ...perm,
        userId: data._id,
      }));

      // Save permissions to DB
      await Permission.create(permission);

      res.status(200).json({ data, message: "User created successfully", success: true });
    } else {
      res.status(409).json({ message: "Username already exists", success: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
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