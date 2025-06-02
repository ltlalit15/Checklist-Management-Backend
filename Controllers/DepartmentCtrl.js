import Schema from "../Models/DepartmentModel.js"
import asyncHandler from 'express-async-handler';

export const getalldepartment = asyncHandler(async (req, res) => {
    try {
        const data = await Schema.find()
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json(error.message);
    }
});


export const adddepartment = asyncHandler(async (req, res) => {
    try {
        const data = await Schema.create(req.body);
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json(error.message);
    }
});

export const updatedepartment = asyncHandler(async (req, res) => {
    try {
        const data = await Schema.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json({ data, message: "department updated successfully", sucess: true });
    } catch (error) {
        res.status(404).json({ error: error.message, message: "department not updated", sucess: false });
    }
}
);
export const deletedepartment = asyncHandler(async (req, res) => {
    try {
        const data = await Schema.findByIdAndDelete(req.params.id);
        res.status(200).json({ data, message: "department deleted successfully", sucess: true });
    } catch (error) {
        res.status(404).json({ error: error.message, message: "department not deleted", sucess: false });
    }
});


