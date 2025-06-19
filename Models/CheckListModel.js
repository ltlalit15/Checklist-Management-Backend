import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const OptionSchema = new Schema({
  action: String,
  choices: String,
});

const AnswerSchema = new Schema({
  question: String,
  options: [OptionSchema],
  required: Boolean,
  instruction: String,
  questionType: String,
});

const ChecklistSchema = new Schema(
  {
    title: String,
    created_by: { type: Schema.Types.ObjectId, ref: 'users' },
    driver: [{ type: Schema.Types.ObjectId, ref: 'Driver' }],
    branches: [{ type: Schema.Types.ObjectId, ref: 'Branch' }],
    answers: [AnswerSchema],
  },
  { timestamps: true }
);

const Checklist = model('Checklist', ChecklistSchema);

export default Checklist;
