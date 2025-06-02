import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
    economicNumber: {
        type: String,
        required: true,
        unique: true
    },
    vehicleType: {
        type: String,
    },
    vehicleDivision: {
        type: String,
    },
    modelName: {
        type: String,
    },
    plate: {
        type: String,
    },
    brand: {
        type: String,
    },
    yearModel: {
        type: String,
    },
    color: {
        type: String,
    },
    insuranceCompany: {
        type: String,
    },
    uploadInsurance: {
        type: String,
    },
    vehicleCard: {
        type: String,
    }


}, {
    timestamps: true
});

const VehicleType = mongoose.model('Vehicle', VehicleSchema);
export default VehicleType;
