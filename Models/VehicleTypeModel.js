import mongoose from 'mongoose';

const VehicleTypeSchema = new mongoose.Schema({
    vehicleType: { type: String, required: true, unique: true },
    description: { type: String }, 
}, {
    timestamps: true
});

const VehicleType = mongoose.model('VehicleType', VehicleTypeSchema);

export default VehicleType;
