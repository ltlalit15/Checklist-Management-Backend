import mongoose from 'mongoose';


const ChecklistSchema = new mongoose.Schema(
  {
    title: { type: String },
    driver: { type: String },
    branches: { type: String },
    answer_types: [],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Checklist', ChecklistSchema);
