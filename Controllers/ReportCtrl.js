// Controller: ReportCtrl.js
import CheckListModel from "../Models/CheckListModel.js";
import filledCheckListModel from "../Models/FillCheckListModel.js";
import { getroutebybranchId } from "../Utills/Helpers.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import routeModel from "../Models/RouteModels.js";
import vehicleModel from "../Models/VehicleModel.js";
import BranchModel from "../Models/BranchModel.js";
// export const checkListPerBranch = asyncHandler(async (req, res) => {
//     try {
//         const { branchId } = req.query;

//         if (!branchId) {
//             return res.status(400).json({ message: "Branch ID is required" });
//         }

//         const branchObjectId = new mongoose.Types.ObjectId(branchId);

//         // ✅ Get checklist for the branch
//         const checklist = await CheckListModel.find({ branches: branchObjectId });

//         if (!checklist || checklist.length === 0) {
//             return res
//                 .status(404)
//                 .json({ message: "No checklist items found for this branch" });
//         }

//         const checklistIds = checklist.map((item) => item._id.toString());

//         // ✅ Get filled checklist entries
//         const filledChecklists = await filledCheckListModel.find({
//             checklistId: { $in: checklistIds },
//         });

//         const filledChecklistIds = filledChecklists.map((f) =>
//             f.checklistId.toString()
//         );

//         const unfilledChecklistIds = checklistIds.filter(
//             (id) => !filledChecklistIds.includes(id)
//         );

//         const total = checklist.length;
//         const filled = checklistIds.length - unfilledChecklistIds.length;
//         const unfilled = unfilledChecklistIds.length;

//         const filledPercentage = ((filled / total) * 100).toFixed(2);
//         const unfilledPercentage = ((unfilled / total) * 100).toFixed(2);

//         console.log("Branch ID:", branchId);
//         const routes = await getroutebybranchId(branchId);

//         res.status(200).json({
//             TotalChecklist: total,
//             FilledChecklist: filled,
//             UnfilledChecklist: unfilled,
//             FilledChecklistPercentage: `${filledPercentage}%`,
//             UnfilledChecklistPercentage: `${unfilledPercentage}%`,
//             Routes: routes, 
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
//------------------------------------------------------------------------------------------------------------------------------
const calculateChecklistPerBranch = async (branchId) => {
  const branchObjectId = new mongoose.Types.ObjectId(branchId);

  const checklist = await CheckListModel.find({ branches: branchObjectId });
  if (!checklist || checklist.length === 0) {
    return null;
  }

  let checklistDriverMap = [];

  for (const checklistItem of checklist) {
    const checklistId = checklistItem._id.toString();
    const drivers = checklistItem.driver || [];

    for (const driverId of drivers) {
      checklistDriverMap.push({
        checklistId,
        driverId: driverId.toString(),
      });
    }
  }

  const total = checklistDriverMap.length;

  const filledChecklists = await filledCheckListModel.find({
    $or: checklistDriverMap.map((item) => ({
      checklistId: item.checklistId,
      driverId: item.driverId,
      driverId: item.driverId
    })),
  });

  const filledChecklistMap = new Set(
    filledChecklists.map(
      (fc) => `${fc.checklistId.toString()}_${fc.driverId.toString()}`
    )
  );

  let filled = 0;
  let unfilled = 0;

  for (const item of checklistDriverMap) {
    const key = `${item.checklistId}_${item.driverId}`;
    if (filledChecklistMap.has(key)) {
      filled++;
    } else {
      unfilled++;
    }
  }

  const filledPercentage = total
    ? ((filled / total) * 100).toFixed(2)
    : "0.00";

  const pendingPercentage = total
    ? ((unfilled / total) * 100).toFixed(2)
    : "0.00";

  const branchData = await BranchModel.findById(branchId);
  const branchName = branchData?.branchName || "Unknown";

  const latestFilled = filledChecklists
    .map(fc => fc.createdAt)
    .sort((a, b) => b - a)[0]; // latest date

  const latestDate = latestFilled
    ? new Date(latestFilled).toLocaleDateString("en-GB") // dd/mm/yyyy
    : "N/A";
  return {
    BranchId: branchId,
    BranchName: branchName,
    TotalChecklist: total,
    FilledChecklist: filled,
    UnfilledChecklist: unfilled,
    CompliancePercentage: `${filledPercentage}%`,
    PendingPercentage: `${pendingPercentage}%`,
    LatestFilledDate: latestDate, 


  };
};


export const getChecklistPerBranchReport = asyncHandler(async (req, res) => {
  try {
    const { branchId } = req.query;

    if (branchId) {
      const result = await calculateChecklistPerBranch(branchId);
      if (!result) {
        return res.status(404).json({ message: "No checklist found for this branch." });
      }
      return res.status(200).json(result);
    } else {
      const allChecklists = await CheckListModel.find({});
      const allBranchIds = [
        ...new Set(allChecklists.flatMap(item => item.branches.map(b => b.toString())))
      ];

      const results = [];

      for (const id of allBranchIds) {
        const branchData = await calculateChecklistPerBranch(id);
        if (branchData) results.push(branchData);
      }

      return res.status(200).json(results);
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//---------------------------------------------------------------------------------------------------------------------------------


export const FilledChecklistByBranchId = asyncHandler(async (req, res) => {
  try {
    const { branchId } = req.body;

    if (!branchId) {
      return res.status(400).json({ message: "branchId is required" });
    }

    // ✅ Step 1: Get all checklists assigned to this branch
    const checklistDocs = await CheckListModel.find({ branches: branchId });
    const checklistIds = checklistDocs.map(cl => cl._id.toString());

    if (checklistIds.length === 0) {
      return res.status(200).json([]); // No checklist assigned to this branch
    }

    // ✅ Step 2: Get all filled checklists where checklistId is in those checklistIds
    const filledChecklists = await filledCheckListModel.find({
      checklistId: { $in: checklistIds }
    });

    const driverIds = [...new Set(filledChecklists.map(fc => fc.driverId.toString()))];

    // ✅ Step 3: Get Routes for Drivers
    const routes = await routeModel.find({ username: { $in: driverIds } });

    const economicVehicleIds = [...new Set(routes.map(r => r.economicNumber?.toString()).filter(Boolean))];
    const vehicles = await vehicleModel.find({ _id: { $in: economicVehicleIds } });

    const vehicleMap = {};
    vehicles.forEach(vehicle => {
      vehicleMap[vehicle._id.toString()] = vehicle.economicNumber;
    });

    const routeMap = {};
    routes.forEach(route => {
      routeMap[route.username.toString()] = {
        routeNumber: route.routeNumber,
        economicNumber: vehicleMap[route.economicNumber?.toString()] || "N/A"
      };
    });

    // ✅ Step 4: Create Maps for Questions and Answers
    const checklistMap = {};
    const questionTextMap = {};
    const choiceTextMap = {};

    checklistDocs.forEach(cl => {
      const optionsMap = {};
      cl.answers.forEach(q => {
        questionTextMap[q._id.toString()] = q.question;
        q.options.forEach(opt => {
          optionsMap[opt._id.toString()] = opt.action;
          choiceTextMap[opt._id.toString()] = opt.choices;
        });
      });
      checklistMap[cl._id.toString()] = optionsMap;
    });

    const finalData = filledChecklists.map((item, index) => {
      const driverId = item.driverId?.toString();
      const optionsMap = checklistMap[item.checklistId.toString()] || {};

      const red = [], orange = [], green = [];

      item.answers.forEach(ans => {
        const action = optionsMap[ans.answerId];
        const question = questionTextMap[ans.questionId] || "N/A";
        const answer = choiceTextMap[ans.answerId] || "N/A";
        const comment = ans.comment || null;

        const answerObj = {
          flag: action,
          question,
          answer,
          comment
        };

        if (action === "wrong") red.push(answerObj);
        else if (action === "warning") orange.push(answerObj);
        else if (action === "correct") green.push(answerObj);
      });

      return {
        sr: index + 1,
        date: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A",
        route: routeMap[driverId]?.routeNumber || "N/A",
        economicNo: routeMap[driverId]?.economicNumber || "N/A",
        red,
        orange,
        green
      };
    });

    res.status(200).json(finalData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




