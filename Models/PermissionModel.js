import mongoose from "mongoose";
const { Schema } = mongoose;

const permissionSchema = new Schema({
    sidebarId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Sidebar'
    },
    
    subSidebar: {
        type: String,
        required: true,
    },
    roleId: {
        type: String,
        required: true,
    },
    isEdit: {
        type: Boolean,
        default: false
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    isCreate: {
        type: Boolean,
        default: false
    },
    isGet: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Permission = mongoose.model('Permission', permissionSchema);

export default Permission;