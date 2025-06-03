import VehicleType from '../Models/VehicleTypeModel.js';

export const createVehicleType = async (req, res) => {
  try {
    const { vehicleType, description, brand, model, color, year } = req.body;
    console.log("Creating vehicle type:", vehicleType, description);
    if (!vehicleType) {
      return res.status(400).json({ message: "Vehicle type is required" });
    }

    const existingVehicleType = await VehicleType.findOne({ vehicleType });
    if (existingVehicleType) {
      return res.status(400).json({ message: "Vehicle type already exists" });
    }

    const newVehicleType = new VehicleType({
      vehicleType,
      description,
      brand,
      model,
      color,
      year
    });

    await newVehicleType.save();

    res.status(201).json(newVehicleType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all vehicle types
export const getVehicleTypes = async (req, res) => {
  try {
    const vehicleTypes = await VehicleType.find();
    res.status(200).json(vehicleTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get vehicle type by ID
export const getVehicleTypeById = async (req, res) => {
  try {
    const vehicleType = await VehicleType.findById(req.params.id);
    if (!vehicleType) return res.status(404).json({ message: "Vehicle type not found" });
    res.status(200).json(vehicleType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update vehicle type by ID
export const updateVehicleType = async (req, res) => {
  try {
    const vehicleType = await VehicleType.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!vehicleType) return res.status(404).json({ message: "Vehicle type not found" });
    res.status(200).json(vehicleType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete vehicle type by ID
export const deleteVehicleType = async (req, res) => {
  try {
    const vehicleType = await VehicleType.findByIdAndDelete(req.params.id);
    if (!vehicleType) return res.status(404).json({ message: "Vehicle type not found" });
    res.status(200).json({ message: "Vehicle type deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
