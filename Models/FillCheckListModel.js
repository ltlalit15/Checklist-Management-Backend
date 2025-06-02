import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  checklistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Checklist',
    required: true,
  },
  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      selectedOptionIndex: Number, 
    }
  ],
  submittedAt: { type: Date, default: Date.now },
});

const FillChecklist = mongoose.model('FillChecklist', answerSchema);

export default FillChecklist;
