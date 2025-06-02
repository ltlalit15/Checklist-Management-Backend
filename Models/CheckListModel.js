import mongoose from 'mongoose';

const AnswerTypeSchema = new mongoose.Schema({
  answer_type: {
    type: String,
    enum: ['select', 'dropdown', 'text', 'image', 'camera', 'date', 'point-image', 'signature'],
    required: true,
  },
  question_text: { type: String, required: true },
  instruction: { type: String },
  is_required: { type: Boolean, default: false },
  options: [{ type: String }],
  corrcetAnswer: { type: String },
  order: { type: Number },
});

const ChecklistSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    checkListStartTime: { type: String, required: true },
    checkListEndTime: { type: String, required: true },
    units: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit',
      },
    ],

    branches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
      },
    ],

    answer_types: [AnswerTypeSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Checklist || mongoose.model('Checklist', ChecklistSchema);
