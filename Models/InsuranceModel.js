import mongoose from 'mongoose';

const InsuranceSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },

}, {
  timestamps: true
});

const Insurance = mongoose.model('Insurance', InsuranceSchema);

export default Insurance;
