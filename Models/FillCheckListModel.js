import mongoose from "mongoose";

const { Schema, model } = mongoose;

const AnswerSchema = new Schema({
  questionId: {
    type: String,
    required: true,
  },
  answerId: {
    type: String,
    // required: true,
  },
  answer: {
    type: Schema.Types.Mixed,
  },
  answerComment: {
    type: String,
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
    BranchId: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    signature: {
      type: String,
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
