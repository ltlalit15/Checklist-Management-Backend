import Schema from "../Models/RouteModels.js";
import Branch from "../Models/BranchModel.js";
import Checklist from "../Models/CheckListModel.js";
import asyncHandler from "express-async-handler";

export const checklistperroute = asyncHandler(async (req, res) => {
    try {
        const routes = await Schema.find().lean().select("-__v");
        const branches = await Branch.find().lean().select("branchCode branchName _id");
        const checklists = await Checklist.find().lean().select("branches checkListStartTime checkListEndTime");

        const branchMap = {};
        const branchIdMap = {};
        branches.forEach((branch) => {
            branchMap[branch.branchCode] = branch.branchName;
            branchIdMap[branch.branchCode] = branch._id.toString();
        });

        const enrichedRoutes = routes.map((route) => {
            const branchName = branchMap[route.branchCode] || "Branch Not Found";
            const branchId = branchIdMap[route.branchCode];

            const matchedChecklist = checklists.find((checklist) =>
                checklist.branches.some((b) => b.toString() === branchId)
            );

            const start = matchedChecklist?.checkListStartTime || null;
            const end = matchedChecklist?.checkListEndTime || null;

            let duration = null;

            if (start && end) {
                const [startH, startM] = start.split(":").map(Number);
                const [endH, endM] = end.split(":").map(Number);

                let totalMinutes = (endH * 60 + endM) - (startH * 60 + startM);
                if (totalMinutes < 0) totalMinutes += 24 * 60; // handle overnight durations

                const hours = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
                const minutes = String(totalMinutes % 60).padStart(2, '0');

                duration = `${hours}:${minutes} hrs`;
            }

            return {
                ...route,
                branchName,
                startTime: start,
                endTime: end,
                duration,
            };
        });



        res.status(200).json(enrichedRoutes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
