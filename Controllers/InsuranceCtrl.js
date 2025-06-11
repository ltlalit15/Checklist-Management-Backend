import Insurance from '../Models/InsuranceModel.js';

// Create new insurance
export const createInsurance = async (req, res) => {
  try {
    const { companyName } = req.body;
 
   
   
   const insurances= await Insurance.create({
    companyName:companyName
   });
    res.status(201).json(insurances);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update insurance by ID
export const updateInsurance = async (req, res) => {
  try {
    const { companyName,} = req.body;
   
    const insurance = await Insurance.findById(req.params.id);
    if (!insurance) return res.status(404).json({ message: "Insurance not found" });

   const insurances= await insurance.save(companyName);
    res.status(200).json(insurances);

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
