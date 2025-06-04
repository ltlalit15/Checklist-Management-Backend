import mongoose from "mongoose";


//       ? req.files.uploadInsurance[0].path
const VehicleSchema = new mongoose.Schema({
    economicNumber: {
        type: String,
        required: true,
        unique: true
    },
    vehicleType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VehicleType',
    },
    vehicleDivision: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VehicleDivision',
    },
    insuranceCompany: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Insurance',
    },
    uploadInsurance: {
        type: String,
    },
    vehicleCard: {
        type: String,
    },
    brachCode: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
    }


}, {
    timestamps: true
});

const VehicleType = mongoose.model('Vehicle', VehicleSchema);
export default VehicleType;
