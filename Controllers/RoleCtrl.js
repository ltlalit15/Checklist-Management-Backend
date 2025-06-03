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
        const permissions = await Permission.find({ roleId: roleId });
        if (!permissions || permissions.length === 0) {
            return res.status(404).json({ message: "No permissions found for this role" });
        }
        
        res.status(200).json({message: "Permissions fetched successfully", success: true , data: permissions });
    } catch (error) {
        res.status(404).json(error.message);
    }
});

// edit permission by id

export const editPermissionById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { isEdit, isDelete, isCreate, isGet } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Permission ID is required" });
        }

        const permission = await Permission.findById(id);
        if (!permission) {
            return res.status(404).json({ message: "Permission not found" });
        }

        permission.isEdit = isEdit;
        permission.isDelete = isDelete;
        permission.isCreate = isCreate;
        permission.isGet = isGet;

        const updatedPermission = await permission.save();
        res.status(200).json({ message: "Permission updated successfully", success: true, data: updatedPermission });
    } catch (error) {
        res.status(404).json(error.message);
    }
});