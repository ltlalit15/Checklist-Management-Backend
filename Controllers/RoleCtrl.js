import Schema from "../Models/RoleModel.js"
import asyncHandler from 'express-async-handler';

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

        res.status(200).json(roles);
    } catch (error) {
        res.status(404).json(error.message);
    }
});

export const editRole = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { roleName , description } = req.body;
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