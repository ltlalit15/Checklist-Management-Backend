import express from 'express';
import multer from 'multer';

import {
  createInsurance,
  getInsurances,
  getInsuranceById,
  updateInsurance,
  deleteInsurance
} from '../Controllers/InsuranceCtrl.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
import { uploadSingleFileToCloudinary } from "../Middewares/uploadPDF.js"
router.post('/insurance', upload.single('documentUrl'), uploadSingleFileToCloudinary, createInsurance);
router.get('/insurance', getInsurances);
router.get('/insurance/:id', getInsuranceById);
router.put('/insurance/:id', upload.single('documentUrl'), uploadSingleFileToCloudinary, updateInsurance);
router.delete('/insurance/:id', deleteInsurance);

export default router;
