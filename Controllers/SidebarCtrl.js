import Permissions from "../Models/SidebarModel.js";
import SubMenuPermissions from "../Models/SubMenuPermissions.js";
import asyncHandler from 'express-async-handler';
import Role from "../Models/RoleModel.js";

export const getPermission = asyncHandler(async (req, res) => {
    try {
        const data = await SubMenuPermissions.find().populate('sidebarId');
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json(error.message);
    }
});



export const createmenuPermission = asyncHandler(async (req, res) => {
    try {

        const { permissionName } = req.body;
        if (!permissionName) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const existingRole = await Permissions.findOne({
            permissionName: permissionName
        });
        if (existingRole) {
            return res.status(400).json({ message: "Permission already exists" });
        }
        const roles = await Permissions.create({
            permissionName
        });

        res.status(200).json(roles);
    } catch (error) {
        res.status(404).json(error.message);
    }
});

export const createsubmenuPermission = asyncHandler(async (req, res) => {
    try {

        const { MenuId, submenuName } = req.body;
        if (!submenuName) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const existingRole = await SubMenuPermissions.findOne({
            submenuName: submenuName
        });
        if (existingRole) {
            return res.status(400).json({ message: "SubmenuName already exists" });
        }
        const roles = await SubMenuPermissions.create({
            submenuName,
            MenuId
        });

        res.status(200).json(roles);
    } catch (error) {
        res.status(404).json(error.message);
    }
});

export const assignPermissions = asyncHandler(async (req, res) => {
    try {
        const { roleId } = req.params;
        const { permissionIds } = req.body;

        const role = await Role.findByIdAndUpdate(
            roleId,
            { $addToSet: { permissions: { $each: permissionIds } } },
            { new: true }
        ).populate('permissions');


        res.status(200).json(role);
    } catch (error) {
        res.status(404).json(error.message);

    }
}
);

export const removePermissions = asyncHandler(async (req, res) => {
    try {
        const { roleId } = req.params;
        const { permissionIds } = req.body;  // Array of permission IDs to remove

        // $pull with $in to remove multiple permissions from array
        const role = await Role.findByIdAndUpdate(
            roleId,
            { $pull: { permissions: { $in: permissionIds } } },
            { new: true }
        ).populate('permissions');

        res.status(200).json(role);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
