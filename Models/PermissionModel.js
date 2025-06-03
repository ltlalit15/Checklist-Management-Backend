import mongoose from "mongoose";
const { Schema } = mongoose;
import Sidebar from "./SidebarModel.js";  // import Sidebar here

const PermissionSchema = new mongoose.Schema({
  sidebarId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sidebar',
    required: true,
  },
  subSidebar: {
    type: String,
    required: false,
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
  isCreate: {
    type: Boolean,
    default: false,
  },
  isGet: {
    type: Boolean,
    default: false,
  },
  permission: {
    type: Boolean,   // <-- yaha true nahi, Boolean type likhna hai
    default: true,   // optional, agar aap chahte hain default true rahe
  },
  roleId: {
    type:String
  }
});

const Permission = mongoose.model('Permission', PermissionSchema);

export default Permission;