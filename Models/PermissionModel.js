import mongoose from "mongoose";
const { Schema } = mongoose;

const permissionSchema = new Schema({
    sidebarId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Sidebar'  // Agar aapka Sidebar collection hai to reference dena achha rahega
    },
    subSidebar: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'  // Agar User collection hai to reference dena
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