import mongoose from 'mongoose';

const InsuranceSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
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
  vehicleNumber: {
    type: String,
    required: true
  },
  documentUrl: {
    type: String
  }
}, {
  timestamps: true
});

const Insurance = mongoose.model('Insurance', InsuranceSchema);

export default Insurance;
