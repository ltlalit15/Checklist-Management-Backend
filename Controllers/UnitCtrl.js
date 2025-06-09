import Schema from "../Models/UnitModel.js"
import Branch from "../Models/BranchModel.js"
import Vehicle from "../Models/BranchModel.js"
import asyncHandler from 'express-async-handler';

export const getAllUnits = asyncHandler(async (req, res) => {
  try {
    const data = await Schema.find()
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
});
export const getallbranchcode = asyncHandler(async (req, res) => {
  try {
    const data = await Branch.find()
      .select("branchCode")
      .sort({ branchCode: 1 });

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
});
export const geteconomicnumber = asyncHandler(async (req, res) => {
  const { branchCode } = req.query;

  if (!branchCode) {
    return res.status(400).json({ message: "branchCode is required" });
  }

  try {
    const data = await Vehicle.find({ branchCode })
      .select("unitNumber")
      .sort({ unitNumber: 1 });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const addUnits = asyncHandler(async (req, res) => {
  try {
    const insuranceUploadUrl = req.files?.insuranceUpload
      ? req.files.insuranceUpload[0].path
      : null;

    const vehicleCardUploadUrl = req.files?.vehicleCardUpload
      ? req.files.vehicleCardUpload[0].path
      : null;

    const unitData = {
      ...req.body,
      insuranceUpload: insuranceUploadUrl,
      vehicleCardUpload: vehicleCardUploadUrl,
    };

    const data = await Schema.create(unitData);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
});

export const updateUnits = asyncHandler(async (req, res) => {
  try {
    const insuranceUploadUrl = req.files?.insuranceUpload
      ? req.files.insuranceUpload[0].path
      : null;

    const vehicleCardUploadUrl = req.files?.vehicleCardUpload
      ? req.files.vehicleCardUpload[0].path
      : null;

    const unitData = {
      ...req.body,
      insuranceUpload: insuranceUploadUrl,
      vehicleCardUpload: vehicleCardUploadUrl,
    };

    const data = await Schema.findByIdAndUpdate(
      req.params.id,
      unitData,
      { new: true }
    );
    res.status(200).json({ data, message: "Unit updated successfully", sucess: true });
  } catch (error) {
    res.status(404).json({ error: error.message, message: "Unit not updated", sucess: false });
  }
}
);
export const deleteUnits = asyncHandler(async (req, res) => {
  try {
    const data = await Schema.findByIdAndDelete(req.params.id);
    res.status(200).json({ data, message: "Unit deleted successfully", sucess: true });
  } catch (error) {
    res.status(404).json({ error: error.message, message: "Unit not deleted", sucess: false });
  }
});