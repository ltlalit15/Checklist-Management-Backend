import Schema from "../Models/BranchModel.js"
import asyncHandler from 'express-async-handler';

export const getallbranch = asyncHandler(async (req, res) => {
    try {
        const data = await Schema.find()
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json(error.message);
    }
});
export const getbranchname = asyncHandler(async (req, res) => {
    try {
        const data = await Schema.find()
        const branchname = data.map((item) => {
            return {
                branchCode: item.branchCode,
            };
        });
        res.status(200).json(branchname);
    } catch (error) {
        res.status(404).json(error.message);
    }
});

export const addbranch = asyncHandler(async (req, res) => {
    try {
        const data = await Schema.create(req.body);
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json(error.message);
    }
});


export const updatebranch = asyncHandler(async (req, res) => {
    try {
        const data = await Schema.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json({ data, message: "Branch updated successfully", sucess: true });
    } catch (error) {
        res.status(404).json({ error: error.message, message: "Branch not updated", sucess: false });
    }
}
);
export const deletebranch = asyncHandler(async (req, res) => {
    try {
        const data = await Schema.findByIdAndDelete(req.params.id);
        res.status(200).json({ data, message: "Branch deleted successfully", sucess: true });
    } catch (error) {
        res.status(404).json({ error: error.message, message: "Branch not deleted", sucess: false });
    }
});


