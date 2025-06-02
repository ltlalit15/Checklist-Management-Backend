import Schema from "../Models/RouteModels.js"
import asyncHandler from 'express-async-handler';

export const getAllRoute = asyncHandler(async (req, res) => {
    try {
        const data = await Schema.find()
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json(error.message);
    }
});

export const addRoute = asyncHandler(async (req, res) => {
    try {
        const data = await Schema.create(req.body);
        res.status(200).json({ data, message: "Route added successfully", sucess: true });
    } catch (error) {
        res.status(404).json({ error: error.message, message: "Route not added", sucess: false });
    }
});

export const updateRoute = asyncHandler(async (req, res) => {
    try {
        const data = await Schema.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json({ data, message: "Route updated successfully", sucess: true });
    } catch (error) {
        res.status(404).json({ error: error.message, message: "Route not updated", sucess: false });
    }
}
);
export const deleteRoute = asyncHandler(async (req, res) => {
    try {
        const data = await Schema.findByIdAndDelete(req.params.id);
        res.status(200).json({ data, message: "Route deleted successfully", sucess: true });
    } catch (error) {
        res.status(404).json({ error: error.message, message: "Route not deleted", sucess: false });
    }
});


