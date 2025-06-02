import Schema from "../Models/PositionModel.js"
import asyncHandler from 'express-async-handler';

export const getallposition = asyncHandler(async (req, res) => {
    try {
        const data = await Schema.find()
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json(error.message);
    }
});


export const addposition = asyncHandler(async (req, res) => {
    try {
        const data = await Schema.create(req.body);
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json(error.message);
    }
});

export const updateposition = asyncHandler(async (req, res) => {
    try {
        const data = await Schema.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json({ data, message: "position updated successfully", sucess: true });
    } catch (error) {
        res.status(404).json({ error: error.message, message: "position not updated", sucess: false });
    }
}
);
export const deleteposition = asyncHandler(async (req, res) => {
    try {
        const data = await Schema.findByIdAndDelete(req.params.id);
        res.status(200).json({ data, message: "position deleted successfully", sucess: true });
    } catch (error) {
        res.status(404).json({ error: error.message, message: "position not deleted", sucess: false });
    }
});


