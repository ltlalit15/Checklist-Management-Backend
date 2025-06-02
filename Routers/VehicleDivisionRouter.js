import express from 'express';
import {
  createVehicleDivision,
  getVehicleDivisions,
  getVehicleDivisionById,
  updateVehicleDivision,
  deleteVehicleDivision
} from '../Controllers/VehicleDivisionCtrl.js';

const router = express.Router();

router.post('/vehicledivision', createVehicleDivision);
router.get('/vehicledivision', getVehicleDivisions);
router.get('/vehicledivision/:id', getVehicleDivisionById);
router.put('/vehicledivision/:id', updateVehicleDivision);
router.delete('/vehicledivision/:id', deleteVehicleDivision);

export default router;
