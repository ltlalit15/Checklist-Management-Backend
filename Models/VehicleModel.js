import mongoose from "mongoose";

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
    branchCode: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
    },
    policyNumber: {
        type: String,
        required: true,
        unique: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },

}, {
    timestamps: true
});

const VehicleType = mongoose.model('Vehicle', VehicleSchema);
export default VehicleType;
