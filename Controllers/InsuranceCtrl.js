import Insurance from '../Models/InsuranceModel.js';

// Create new insurance
export const createInsurance = async (req, res) => {
  try {
    const { companyName, policyNumber, startDate, endDate, vehicleNumber } = req.body;
    if (!companyName || !policyNumber || !startDate || !endDate || !vehicleNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingInsurance = await Insurance.findOne({
      $or: [
        { policyNumber: policyNumber },
        { vehicleNumber: vehicleNumber }
      ]
    });
    if (existingInsurance) {
      return res.status(400).json({ message: "Policy number or vehicle number already exists" });
    }

    const doc = req.uploadedFileUrl;
    const insurance = new Insurance({
      companyName,
      policyNumber,
      startDate,
      endDate,
      vehicleNumber,
      documentUrl: doc ? doc : null
    });
    await insurance.save();
    res.status(201).json(insurance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update insurance by ID
export const updateInsurance = async (req, res) => {
  try {
    const { companyName, policyNumber, startDate, endDate, vehicleNumber } = req.body;
    if (!companyName || !policyNumber || !startDate || !endDate || !vehicleNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const insurance = await Insurance.findById(req.params.id);
    if (!insurance) return res.status(404).json({ message: "Insurance not found" });

    insurance.companyName = companyName;
    insurance.policyNumber = policyNumber;
    insurance.startDate = startDate;
    insurance.endDate = endDate;
    insurance.vehicleNumber = vehicleNumber;

    // Only update documentUrl if a new file was uploaded
    if (req.uploadedFileUrl) {
      insurance.documentUrl = req.uploadedFileUrl;
    }

    await insurance.save();
    res.status(200).json(insurance);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Get all insurances
export const getInsurances = async (req, res) => {
  try {
    const insurances = await Insurance.find();
    res.status(200).json(insurances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get insurance by ID
export const getInsuranceById = async (req, res) => {
  try {
    const insurance = await Insurance.findById(req.params.id);
    if (!insurance) return res.status(404).json({ message: "Insurance not found" });
    res.status(200).json(insurance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete insurance by ID
export const deleteInsurance = async (req, res) => {
  try {
    const insurance = await Insurance.findByIdAndDelete(req.params.id);
    if (!insurance) return res.status(404).json({ message: "Insurance not found" });
    res.status(200).json({ message: "Insurance deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
