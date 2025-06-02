import mongoose from "mongoose";

const { Schema } = mongoose;

const Schemas = new Schema(
  {
    departmentName: {
      type: String,
      required: [true, "departmentName name is required."],
      unique: [true, "departmentName name must be unique."],
    },

  },
  {
    timestamps: true,
  }
);

const category = mongoose.model("Departments", Schemas);

export default category;
