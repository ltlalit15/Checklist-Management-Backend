import Schema from "../Models/CheckListModel.js"
import FillSchema from "../Models/FillCheckListModel.js"
import asyncHandler from 'express-async-handler';
import { getquestionsbyId, getanswerssbyId } from '../Utills/Helpers.js';
import mongoose from 'mongoose';

export const getallchecklist = asyncHandler(async (req, res) => {
  try {
    const data = await Schema.find()
      .populate('department', 'departmentName')
      .populate('position', 'positionName')
      .populate('branches', 'branchName')
      .populate('created_by', 'username')
    const modifiedData = data.map((checklist) => ({
      ...checklist._doc,
      totalQuestions: checklist.answers.length,
    }));

    res.status(200).json({
      data: modifiedData,
      message: "Checklist fetched successfully",
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
      message: "Checklist not fetched",
      success: false,
    });
  }
});

export const getchecklistByDriverid = asyncHandler(async (req, res) => {
  try {
    const { driverId } = req.query;

    // Base query
    let query = {};

    // If driverId is passed, filter checklists that include this driver
    if (driverId) {
      query.driver = driverId;
    }
    console.log(query, "query");
    const data = await Schema.find(query)
      .populate('driver', 'username')
      .populate('branches', 'branchName')
      .populate('created_by', 'username');

    const modifiedData = data.map((checklist) => ({
      ...checklist._doc,
      totalQuestions: checklist.answers.length,
    }));

    res.status(200).json({
      data: modifiedData,
      message: "Checklist fetched successfully",
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
      message: "Checklist not fetched",
      success: false,
    });
  }
});

export const getchecklistbyid = asyncHandler(async (req, res) => {
  try {

    const data = await Schema.findById(req.params.id)
      .populate('branches', 'branchName')
      .populate('created_by', 'username')
      .populate('department', 'departmentName')
      .populate('position', 'positionName')
    if (!data) {
      return res.status(404).json({
        message: "Checklist not found", success: false
      });
    }
    const modifiedData = {
      ...data._doc,
      totalQuestions: data.answers.length,
    };
    res.status(200).json({
      data: modifiedData,
      message: "Checklist fetched successfully",
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
      message: "Checklist not fetched",
      success: false,
    });
  }
});

// export const addchecklist = asyncHandler(async (req, res) => {
//   try {
//     const { title, driver, answers, created_by , position, department , branches} = req.body;

//     const checklistData = {
//       title,
//       driver,
//       answers,
//       position, 
//       department,
//       branches,
//       created_by
//     };

//     const checklist = new Schema(checklistData);
//     const saved = await checklist.save();

//     res.status(201).json({ success: true, data: saved });
//   } catch (err) {
//     console.error("Checklist Create Error:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// });

export const addchecklist = asyncHandler(async (req, res) => {
  try {
    const { title, driver, answers, created_by, position, department, branches } = req.body;

    // Ensure default option if options array is empty
    const processedAnswers = answers.map((ans) => {
      if (!ans.options || ans.options.length === 0) {
        return {
          ...ans,
          options: [
            {
              _id: new mongoose.Types.ObjectId(),
              action: "correct",
              choices: ""
            }
          ]
        };
      }
      return ans;
    });

    const checklistData = {
      title,
      driver,
      created_by,
      position,
      department,
      branches,
      answers: processedAnswers
    };

    const checklist = new Schema(checklistData);
    const saved = await checklist.save();

    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    console.error("Checklist Create Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export const updatechecklist = asyncHandler(async (req, res) => {
  try {
    const data = await Schema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ data, message: "checklist updated successfully", sucess: true });
  } catch (error) {
    res.status(404).json({ error: error.message, message: "checklist not updated", sucess: false });
  }
}
);

export const deletechecklist = asyncHandler(async (req, res) => {
  try {
    const data = await Schema.findByIdAndDelete(req.params.id);
    await FillSchema.findByIdAndDelete(req.params.id)
    res.status(200).json({ data, message: "checklist deleted successfully", sucess: true });
  } catch (error) {
    res.status(404).json({ error: error.message, message: "checklist not deleted", sucess: false });
  }
});

export const getresponse = asyncHandler(async (req, res) => {
  try {
    const data = await Schema.aggregate([
      {
        $lookup: {
          from: "branches",
          localField: "branches._id",
          foreignField: "_id",
          as: "branchDetails"
        }
      },
      { $unwind: { path: "$branchDetails", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "units",
          localField: "units._id",
          foreignField: "_id",
          as: "unitDetails"
        }
      },
      { $unwind: { path: "$unitDetails", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "routes",
          localField: "routes._id",
          foreignField: "_id",
          as: "routeDetails"
        }
      },
      { $unwind: { path: "$routeDetails", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "checklists",
          localField: "checklistId._id",
          foreignField: "_id",
          as: "checklistDetails"
        }
      },
      { $unwind: { path: "$checklistDetails", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "users",
          localField: "driverId._id",
          foreignField: "_id",
          as: "driverDetails"
        }
      },
      { $unwind: { path: "$driverDetails", preserveNullAndEmptyArrays: true } },

      {
        $project: {
          checklistTitle: "$checklistDetails.title",
          driverName: { $concat: ["$driverDetails.firstname", " ", "$driverDetails.lastname"] },
          branchCode: "$branchDetails.branchCode",
          unitNumber: "$unitDetails.unitNumber",
          routeNumber: "$routeDetails.routeNumber",
          answers: 1,
          createdAt: 1
        }
      }
    ]);

    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("Error in aggregation:", err);
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }

}
);

export const fillchecklist = asyncHandler(async (req, res) => {
  try {
    const { checklistId, driverId, answers, signature, BranchId } = req.body;

    // Basic validation
    if (!checklistId || !signature || !driverId || !BranchId || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({
        message: "Checklist ID, Driver ID, and answers are required",
        success: false,
      });
    }
    const alreadyFilled = await FillSchema.findOne({ driverId, checklistId });
    if (alreadyFilled) {
      return res.status(400).json({
        success: false,
        message: "Checklist already filled by this driver",
      });
    }
    // Create new fill entry
    const filledChecklist = await FillSchema.create({
      checklistId,
      driverId,
      answers,
      signature,
      BranchId
    });

    res.status(201).json({
      data: filledChecklist,
      message: "Checklist filled successfully",
      success: true,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Failed to fill checklist",
      success: false,
    });
  }
});


export const getfillchecklist = async (req, res) => {
  try {
    const { checklistId } = req.params;

    const filter = {};
    if (checklistId) filter.checklistId = checklistId;

    const data = await FillSchema.find(filter)
      .populate("checklistId", "title answers")
      .populate("driverId", "username")
      .populate("BranchId", "_id");

    const formatted = data.map((entry) => {
      const checklist = entry.checklistId;
      const filledAnswers = entry?.answers;

      const structuredAnswers = filledAnswers.map((filled) => {
        const question = checklist?.answers.find(
          (q) => q._id?.toString() === filled.questionId?.toString()
        );

        const selectedOption = question?.options?.find(
          (opt) => opt._id?.toString() === filled.answerId?.toString()
        );

        return {
          question: question?.question || "Question not found",
          type: question?.questionType || "N/A",
          required: question?.required || false,
          selectedAnswer: {
            choice: selectedOption?.choices || "Option not found",
            action: selectedOption?.action || "N/A",
          },
          comment: filled.comment || "",
        };
      });

      return {
        fillId: entry._id,
        checklistTitle: checklist?.title || "N/A",
        driver: entry.driverId?.username || "Unknown",
        answers: structuredAnswers,
        signature: entry.signature,
        createdAt: entry.createdAt,
      };
    });

    return res.status(200).json({
      success: true,
      message: "Filled checklist fetched successfully",
      data: formatted,
    });
  } catch (error) {
    console.error("Error in getfillchecklist:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch filled checklist",
      error: error.message,
    });
  }
};

export const getAllCheckListData = async (req, res) => {
  try {
    const response = await FillSchema.find()
      .populate("checklistId", "title answers")
      .populate("driverId", "username")
      .populate("BranchId", "_id");

    // Format the response
    const formatted = response.map((item) => ({
      _id: item._id,
      checklistTitle: item.checklistId?.title || "",
      driver: item.driverId?.username || "",
      branchId: item.BranchId?._id || "",
      signature: item.signature,
      answers: item.answers,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));

    return res.status(200).json(formatted);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};






