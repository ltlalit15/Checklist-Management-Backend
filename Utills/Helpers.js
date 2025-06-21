import Checklist from "../Models/CheckListModel.js";

export async function getquestionsbyId(id = "") {
  if (!id) return [];

  const checklist = await Checklist.findById(id).select("answers");
  return checklist?.answers || [];
}
import FillSchema from "../Models/FillCheckListModel.js"; // assuming filled checklist model ka naam

export async function getanswerssbyId(user_id = "") {
  if (!user_id) return [];

  const filled = await FillSchema.findOne({ _id: user_id }); // ya service_id, based on how you're calling
  return filled?.answers || [];
}
