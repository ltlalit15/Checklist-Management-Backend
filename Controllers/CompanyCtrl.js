import Schema from "../Models/CompanyModel.js"
import asyncHandler from 'express-async-handler';

export const getallCompany = asyncHandler(async (req, res) => {
    try {
        const data = await Schema.find()
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json(error.message);
    }
});
export const getallCompanyName = asyncHandler(async (req, res) => {
    try {
        const data = await Schema.find()
            .select("companyName")
            .sort({ companyName: 1 });
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json(error.message);
    }
});

export const addCompany = asyncHandler(async (req, res) => {
    try {
        const data = await Schema.create(req.body);
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json(error.message);
    }
});

export const updateCompany = asyncHandler(async (req, res) => {
    try {
        const data = await Schema.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json({ data, message: "Company updated successfully", sucess: true });
    } catch (error) {
        res.status(404).json({ error: error.message, message: "Company not updated", sucess: false });
    }
}
);

export const deleteCompany = asyncHandler(async (req, res) => {
    try {
        const data = await Schema.findByIdAndDelete(req.params.id);
        res.status(200).json({ data, message: "Company deleted successfully", sucess: true });
    } catch (error) {
        res.status(404).json({ error: error.message, message: "Company not deleted", sucess: false });
    }
});