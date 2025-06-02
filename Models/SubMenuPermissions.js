import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({

  sidebarId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sidebar'
  },
  subSidebar: {
    type: String,
    required: true,
  },

}, { timestamps: true });

const Permissions = mongoose.model("Subsidebars", permissionSchema);

export default Permissions;
