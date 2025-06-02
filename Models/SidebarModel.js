import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({

  sidebarName: {
    type: String,
    required: true,
  }

}, { timestamps: true });

const Permissions = mongoose.model("Sidebar", permissionSchema);

export default Permissions;
