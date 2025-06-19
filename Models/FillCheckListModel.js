import mongoose from "mongoose";

const { Schema, model } = mongoose;

const AnswerSchema = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    ref: "ChecklistQuestion", // Ref to question collection
    required: true,
  },
  answerId: {
    type: Schema.Types.ObjectId,
    ref: "AnswerOption", // Ref to answer option collection
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

const FillChecklistSchema = new Schema(
  {
    checklistId: {
      type: Schema.Types.ObjectId,
      ref: "Checklist",
      required: true,
    },
    driverId: {
      type: Schema.Types.ObjectId,
      ref: "Driver",
      required: true,
    },
    answers: [AnswerSchema],
  },
  {
    timestamps: true,
  }
);

const FillChecklist = model("FillChecklist", FillChecklistSchema);
export default FillChecklist;
