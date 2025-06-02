import Schema from "../Models/CategoryModel.js"
import asyncHandler from 'express-async-handler';

export const getallcategory = asyncHandler(async (req, res) => {
    try {
        const data = await Schema.find()
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json(error.message);
    }
});
export const getallcategoryName = asyncHandler(async (req, res) => {
    try {
        const data = await Schema.find()
        const categoryname = data.map((item) => {
            return {
                categoryname: item.categoryname,
            };
        });
        res.status(200).json(categoryname);
    } catch (error) {
        res.status(404).json(error.message);
    }
});

export const addcategory = asyncHandler(async (req, res) => {
    try {
        const data = await Schema.create(req.body);
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json(error.message);
    }
});

export const updatecategory = asyncHandler(async (req, res) => {
    try {
        const data = await Schema.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json({ data, message: "Category updated successfully", sucess: true });
    } catch (error) {
        res.status(404).json({ error: error.message, message: "Category not updated", sucess: false });
    }
}
);
export const deletecategory = asyncHandler(async (req, res) => {
    try {
        const data = await Schema.findByIdAndDelete(req.params.id);
        res.status(200).json({ data, message: "Category deleted successfully", sucess: true });
    } catch (error) {
        res.status(404).json({ error: error.message, message: "Category not deleted", sucess: false });
    }
});


