import mongoose from "mongoose";

const { Schema } = mongoose;

const RolesSchema = new Schema(
  {
    roleName: {
      type: String,
    },
    description: {
      type: String,
    },
   
  },
  {
    timestamps: true,
  }
);

const Role = mongoose.model("Roles", RolesSchema);

export default Role;
