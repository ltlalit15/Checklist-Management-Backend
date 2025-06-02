import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    categoryname: {
      type: String,
      required: [true, "Category name is required."],
      unique: [true, "Category name must be unique."],
    },
    // createdBy: {
    //   type: String,
    //   required: [true, "Creator is required."],
    // },
  },
  {
    timestamps: true,
  }
);

const category = mongoose.model("category", categorySchema);

export default category;
