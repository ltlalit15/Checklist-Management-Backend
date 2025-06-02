
//create router 
import express from 'express';
import upload from "../Middewares/Cloudinary.js";

const router = express.Router();
import { deleteVehicle, getVehicleById, getVehicles, updateVehicle, createVehicle } from '../Controllers/VehicleCtrl.js';

router.post('/vehicle', upload.fields([
    { name: "uploadInsurance", maxCount: 1 },
    { name: "vehicleCard", maxCount: 1 },
]), createVehicle);
router.get('/vehicle', getVehicles);
router.get('/vehicle/:id', getVehicleById);
router.put('/vehicle/:id', upload.fields([
    { name: "uploadInsurance", maxCount: 1 },
    { name: "vehicleCard", maxCount: 1 },
]), updateVehicle);
router.delete('/vehicle/:id', deleteVehicle);

export default router;
