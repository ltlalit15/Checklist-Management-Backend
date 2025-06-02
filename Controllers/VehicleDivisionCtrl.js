import VehicleDivision from '../Models/VehicleDivisionModel.js';

// Create vehicle division
export const createVehicleDivision = async (req, res) => {
  try {
    const vehicleDivision = new VehicleDivision(req.body);
    await vehicleDivision.save();
    res.status(201).json(vehicleDivision);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all vehicle divisions
export const getVehicleDivisions = async (req, res) => {
  try {
    const vehicleDivisions = await VehicleDivision.find();
    res.status(200).json(vehicleDivisions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get vehicle division by ID
export const getVehicleDivisionById = async (req, res) => {
  try {
    const vehicleDivision = await VehicleDivision.findById(req.params.id);
    if (!vehicleDivision) return res.status(404).json({ message: "Vehicle division not found" });
    res.status(200).json(vehicleDivision);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update vehicle division by ID
export const updateVehicleDivision = async (req, res) => {
  try {
    const vehicleDivision = await VehicleDivision.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!vehicleDivision) return res.status(404).json({ message: "Vehicle division not found" });
    res.status(200).json(vehicleDivision);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete vehicle division by ID
export const deleteVehicleDivision = async (req, res) => {
  try {
    const vehicleDivision = await VehicleDivision.findByIdAndDelete(req.params.id);
    if (!vehicleDivision) return res.status(404).json({ message: "Vehicle division not found" });
    res.status(200).json({ message: "Vehicle division deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
