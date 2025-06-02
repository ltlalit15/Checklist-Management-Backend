import express from 'express';
import {
  createVehicleType,
  getVehicleTypes,
  getVehicleTypeById,
  updateVehicleType,
  deleteVehicleType
} from '../Controllers/VehicleTypeCtrl.js';

const router = express.Router();

router.post('/vehicletype', createVehicleType);
router.get('/vehicletype', getVehicleTypes);
router.get('/vehicletype/:id', getVehicleTypeById);
router.put('/vehicletype/:id', updateVehicleType);
router.delete('/vehicletype/:id', deleteVehicleType);

export default router;
