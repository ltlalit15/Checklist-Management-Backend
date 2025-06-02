import mongoose from "mongoose";

const { Schema } = mongoose;

const routeSchema = new Schema(
  {
    routeNumber: {
      type: String,
    },
    branchCode: {
      type: String,
    },
    economicNumber: {
      type: String,
    },
    username: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const route = mongoose.model("routes", routeSchema);

export default route;
