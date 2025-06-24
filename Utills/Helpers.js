import Checklist from "../Models/CheckListModel.js";
import RouteModels from "../Models/RouteModels.js";

export async function getquestionsbyId(id = "") {
  if (!id) return [];

  const checklist = await Checklist.findById(id).select("answers");
  return checklist?.answers || [];
}
import FillSchema from "../Models/FillCheckListModel.js";

export async function getanswerssbyId(user_id = "") {
  if (!user_id) return [];

  const filled = await FillSchema.findOne({ _id: user_id });
  return filled?.answers || [];
}

export async function getroutebybranchId(branchId = "") {
  if (!branchId) return [];

  const routes = await RouteModels.find({ branchCode: branchId })
  console.log("Routes for branchssssssssssssssssssss:", routes);
  return routes || [];
}
