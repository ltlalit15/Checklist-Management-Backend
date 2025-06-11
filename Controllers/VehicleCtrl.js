import Vehicle from '../Models/VehicleModel.js';

// Create Vehicle
export const createVehicle = async (req, res) => {
  try {
    const {
      economicNumber,
      vehicleType,
      vehicleDivision,
      insuranceCompany,
      branchCode,
      endDate,
      startDate,
      policyNumber
    } = req.body;

    const insuranceUploadUrl = req.files?.uploadInsurance
      ? req.files.uploadInsurance[0].path
      : null;

    const vehicleCardUploadUrl = req.files?.vehicleCard
      ? req.files.vehicleCard[0].path
      : null;



    const existingVehicle = await Vehicle.findOne({ economicNumber });
    if (existingVehicle) {
      return res.status(400).json({ message: "Vehicle with this number already exists" });
    }

    const vehicle = new Vehicle({
      economicNumber,
      vehicleType,
      vehicleDivision,
      insuranceCompany,
      branchCode,
      uploadInsurance: insuranceUploadUrl,
      vehicleCard: vehicleCardUploadUrl,
      endDate,
      startDate,
      policyNumber
    });

    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Vehicle

export const updateVehicle = async (req, res) => {
  try {
    const {
      economicNumber,
      vehicleType,
      vehicleDivision,
      modelName,
      plate,
      branchCode,
      insuranceCompany,
       endDate,
      startDate, 
      policyNumber
    } = req.body;

    const insuranceUploadUrl = req.files?.uploadInsurance
      ? req.files.uploadInsurance[0].path
      : null;

    const vehicleCardUploadUrl = req.files?.vehicleCard
      ? req.files.vehicleCard[0].path
      : null;

    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    vehicle.economicNumber = economicNumber || vehicle.economicNumber;
    vehicle.vehicleType = vehicleType || vehicle.vehicleType;
    vehicle.vehicleDivision = vehicleDivision || vehicle.vehicleDivision;

    vehicle.endDate = endDate || vehicle.endDate;
    vehicle.startDate = startDate || vehicle.startDate;
    vehicle.policyNumber = policyNumber || vehicle.policyNumber;

    vehicle.modelName = modelName || vehicle.modelName;
    vehicle.branchCode = branchCode || vehicle.branchCode;
    vehicle.plate = plate || vehicle.plate;
    vehicle.insuranceCompany = insuranceCompany || vehicle.insuranceCompany;
    if (insuranceUploadUrl) {
      vehicle.uploadInsurance = insuranceUploadUrl;
    }
    if (vehicleCardUploadUrl) {
      vehicle.vehicleCard = vehicleCardUploadUrl;
    }

    await vehicle.save();
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get all Vehicles
export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate({
      path: 'vehicleType',
      select: 'vehicleType brand model '
    })
      .populate({
        path: 'vehicleDivision',
        select: 'divisionName'
      })
      .populate({
        path: 'insuranceCompany',
        select: 'companyName'
      })
      .populate({
        path: 'branchCode',
        select: 'branchCode'
      });

    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Vehicle by ID
export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id)
      .populate('vehicleType')
      .populate('vehicleDivision')
      .populate('insurance');

    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Vehicle
export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
