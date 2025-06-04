import Schema from "../Models/RoleModel.js"
import asyncHandler from 'express-async-handler';
import Permission from "../Models/PermissionModel.js";


export const getRoleWithPermissions = asyncHandler(async (req, res) => {
    try {
        const data = await Schema.find()
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json(error.message);
    }
});

export const createRole = asyncHandler(async (req, res) => {
    try {

        const { roleName, description } = req.body;
        if (!roleName || !description) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const existingRole = await Schema.findOne({
            roleName: roleName
        });

        if (existingRole) {
            return res.status(400).json({ message: "Role already exists" });
        }
        const roles = await Schema.create({
            roleName,
            description
        });

        const permissionTemplate = [
            {
                sidebarId: "683d7168bcb71900b5cb2141",
                subSidebar: null,
                isEdit: false,
                isDelete: false,
                isCreate: false,
                isGet: true,
                permission: true
            },
            {
                sidebarId: "683d7168bcb71900b5cb2142",
                subSidebar: null,
                isEdit: false,
                isDelete: false,
                isCreate: false,
                isGet: true,
                permission: true
            },
            {
                sidebarId: "683d7168bcb71900b5cb2143",
                subSidebar: "Insurance",
                isEdit: false,
                isDelete: false,
                isCreate: false,
                isGet: true,
                permission: true
            },
            {
                sidebarId: "683d7168bcb71900b5cb2143",
                subSidebar: "vehicleType",
                isEdit: false,
                isDelete: false,
                isCreate: false,
                isGet: true,
                permission: true

            },
            {
                sidebarId: "683d7168bcb71900b5cb2143",
                subSidebar: "vehicleDivision",
                isEdit: false,
                isDelete: false,
                isCreate: false,
                isGet: true,
                permission: true
            },
            {
                sidebarId: "683d7168bcb71900b5cb2143",
                subSidebar: "vehicle",
                isEdit: false,
                isDelete: false,
                isCreate: false,
                isGet: true,
                permission: true
            },
            {
                sidebarId: "683d7168bcb71900b5cb2144",
                subSidebar: "Position",
                isEdit: false,
                isDelete: false,
                isCreate: false,
                isGet: true,
                permission: true
            },
            {
                sidebarId: "683d7168bcb71900b5cb2144",
                subSidebar: "Department",
                isEdit: false,
                isDelete: false,
                isCreate: false,
                isGet: true,
                permission: true
            },
            {
                sidebarId: "683d7168bcb71900b5cb2144",
                subSidebar: "Driver",
                isEdit: false,
                isDelete: false,
                isCreate: false,
                isGet: true,
                permission: true
            },
            {
                sidebarId: "683d7168bcb71900b5cb2144",
                subSidebar: "DriverList",
                isEdit: false,
                isDelete: false,
                isCreate: false,
                isGet: true,
                permission: true
            },
            {
                sidebarId: "683d7168bcb71900b5cb2145",
                subSidebar: null,
                isEdit: false,
                isDelete: false,
                isCreate: false,
                isGet: true,
                permission: true
            },

            {
                sidebarId: "683d7168bcb71900b5cb2146",
                subSidebar: "createChecklist",
                isEdit: false,
                isDelete: false,
                isCreate: false,
                isGet: true,
                permission: true
            },
            {
                sidebarId: "683d7168bcb71900b5cb2146",
                subSidebar: "Checklist",
                isEdit: false,
                isDelete: false,
                isCreate: false,
                isGet: true,
                permission: true
            },
            {
                sidebarId: "683d7168bcb71900b5cb2147",
                subSidebar: "BranchChecklist",
                isEdit: false,
                isDelete: false,
                isCreate: false,
                isGet: true,
                permission: true
            },
            {
                sidebarId: "683d7168bcb71900b5cb2147",
                subSidebar: "RouteChecklist",
                isEdit: false,
                isDelete: false,
                isCreate: false,
                isGet: true,
                permission: true
            },
            {
                sidebarId: "683d7168bcb71900b5cb2147",
                subSidebar: "EconomicunitChecklist",
                isEdit: false,
                isDelete: false,
                isCreate: false,
                isGet: true,
                permission: true

            },
            {
                sidebarId: "683d7168bcb71900b5cb2147",
                subSidebar: "AnswerChecklist",
                isEdit: false,
                isDelete: false,
                isCreate: false,
                isGet: true,
                permission: true
            },
            {
                sidebarId: "683d7168bcb71900b5cb2148",
                subSidebar: null,
                isEdit: false,
                isDelete: false,
                isCreate: false,
                isGet: true,
                permission: true

            }
        ];
        const permission = permissionTemplate.map((perm) => ({
            ...perm,
            roleId: roles._id,
        }));

        const RolePermission = await Permission.create(permission);

        res.status(200).json({ roles, message: "Role created successfully", success: true, RolePermission });
    } catch (error) {
        res.status(404).json(error.message);
    }
});

export const editRole = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { roleName, description } = req.body;
        if (!roleName) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const existingRole = await Schema.findById(id);
        if (!existingRole) {
            return res.status(404).json({ message: "Role not found" });
        }
        existingRole.roleName = roleName;
        existingRole.description = description;
        const updatedRole = await existingRole.save();
        res.status(200).json(updatedRole);
    } catch (error) {
        res.status(404).json(error.message);
    }
}
);

export const deleteRole = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const existingRole = await Schema.findById(id);
        if (!existingRole) {
            return res.status(404).json({ message: "Role not found" });
        }
        await Schema.findByIdAndDelete(id);
        res.status(200).json({ message: "Role deleted successfully" });
    } catch (error) {
        res.status(404).json(error.message);
    }
}
);

// permission by role id


export const getPermissionByRoleId = asyncHandler(async (req, res) => {
    try {
        const { roleId } = req.params;
        if (!roleId) {
            return res.status(400).json({ message: "Role ID is required" });
        }

        const permissions = await Permission.find({ roleId: roleId })
            .populate({
                path: 'sidebarId',
                select: 'sidebarName'
            });

        console.log("Permissions:", permissions); // Debugging line to check fetched permissions
        const formattedPermissions = permissions.map(p => ({
            _id: p._id,
            sidebarName: p.sidebarId.sidebarName,  // direct sidebarName nikal ke
            subSidebar: p.subSidebar,
            isEdit: p.isEdit,
            isDelete: p.isDelete,
            isCreate: p.isCreate,
            isGet: p.isGet,
            permission: p.permission,
            roleId: p.roleId
        }));

        res.status(200).json({ message: "Permissions fetched successfully", success: true, data: formattedPermissions });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// edit permission  by id

import mongoose from 'mongoose';

export const editPermissionsBulk = asyncHandler(async (req, res) => {
    try {
        const updates = req.body;

        if (!Array.isArray(updates) || updates.length === 0) {
            return res.status(400).json({ message: "Invalid input data", success: false });
        }

        const bulkOps = updates.map((item) => ({
            updateOne: {
                filter: { _id: new mongoose.Types.ObjectId(item._id) },
                update: {
                    $set: {
                        isEdit: item.isEdit,
                        isDelete: item.isDelete,
                        isCreate: item.isCreate,
                        isGet: item.isGet,
                        permission: item.permission,
                    }
                }
            }
        }));

        const result = await Permission.bulkWrite(bulkOps);

        res.status(200).json({
            message: `${result.modifiedCount} permissions updated successfully`,
            success: true,
            result,
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});
