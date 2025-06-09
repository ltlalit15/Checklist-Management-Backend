import mongoose from "mongoose";

const { Schema } = mongoose;

const routeSchema = new Schema(
  {
    routeNumber: {
      type: String,
    },
   branchCode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
    economicNumber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
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
