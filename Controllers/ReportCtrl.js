// Controller: ReportCtrl.js
import CheckListModel from "../Models/CheckListModel.js";
import filledCheckListModel from "../Models/FillCheckListModel.js";
import { getroutebybranchId } from "../Utills/Helpers.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

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


export const checkListPerBranch = asyncHandler(async (req, res) => {
    try {
        const { branchId } = req.query;

        // ✅ Helper function for calculating data for one branch
        const calculateBranchData = async (branchId) => {
            const branchObjectId = new mongoose.Types.ObjectId(branchId);

            const checklist = await CheckListModel.find({ branches: branchObjectId });

            if (!checklist || checklist.length === 0) {
                return null;
            }

            const checklistIds = checklist.map((item) => item._id.toString());

            const filledChecklists = await filledCheckListModel.find({
                checklistId: { $in: checklistIds },
            });

            const filledChecklistIds = filledChecklists.map((f) =>
                f.checklistId.toString()
            );

            const unfilledChecklistIds = checklistIds.filter(
                (id) => !filledChecklistIds.includes(id)
            );

            const total = checklist.length;
            const filled = checklistIds.length - unfilledChecklistIds.length;
            const unfilled = unfilledChecklistIds.length;

            const filledPercentage = ((filled / total) * 100).toFixed(2);
            const unfilledPercentage = ((unfilled / total) * 100).toFixed(2);

            const routes = await getroutebybranchId(branchId);

            return {
                BranchId: branchId,
                TotalChecklist: total,
                FilledChecklist: filled,
                UnfilledChecklist: unfilled,
                FilledChecklistPercentage: `${filledPercentage}%`,
                UnfilledChecklistPercentage: `${unfilledPercentage}%`,
                Routes: routes,
            };
        };

        if (branchId) {
            const result = await calculateBranchData(branchId);
            if (!result) {
                return res.status(404).json({ message: "No checklist found for this branch." });
            }
            return res.status(200).json(result);
        } else {
            // ✅ All distinct branches from checklist model
            const allChecklists = await CheckListModel.find({});
            const allBranchIds = [
                ...new Set(allChecklists.flatMap(item => item.branches.map(b => b.toString())))
            ];

            const results = [];

            for (const id of allBranchIds) {
                const branchData = await calculateBranchData(id);
                if (branchData) results.push(branchData);
            }

            return res.status(200).json(results);
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

