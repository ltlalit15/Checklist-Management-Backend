import mongoose from 'mongoose';

const VehicleDivisionSchema = new mongoose.Schema({
    divisionName: { type: String, required: true, unique: true },
    zone: { type: String },
}, {
    timestamps: true
});

const VehicleDivision = mongoose.model('VehicleDivision', VehicleDivisionSchema);

export default VehicleDivision;
