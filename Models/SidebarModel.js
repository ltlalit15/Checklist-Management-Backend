import mongoose from "mongoose";

const SidebarSchema = new mongoose.Schema({

  sidebarName: {
    type: String,
    required: true,
  }

}, { timestamps: true });

const Sidebar = mongoose.model("Sidebar", SidebarSchema);

export default Sidebar;
