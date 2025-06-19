import Schema from "../Models/CheckListModel.js"
import FillSchema from "../Models/FillCheckListModel.js"
import asyncHandler from 'express-async-handler';

export const getallchecklist = asyncHandler(async (req, res) => {
  try {
    const data = await Schema.find()
      .populate('driver', 'username')
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

export const getchecklistbyid = asyncHandler(async (req, res) => {
  try {

    const data = await Schema.findById(req.params.id)
      .populate('driver', 'username')
      .populate('branches', 'branchName') 
      .populate('created_by', 'username');
    if (!data) {
      return res.status(404).json({ message: "Checklist not found", success: false
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

export const addchecklist = asyncHandler(async (req, res) => {
  try {
    const { title, driver, branches, answers, created_by } = req.body;

    const checklistData = {
      title,
      driver,
      branches,
      answers,
      created_by
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
    const { checklistId, answers } = req.body;
    if (!checklistId || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ message: 'Checklist ID and at least one answer is required.' });
    }
    const checkList = await FillSchema.create(req.body);
    res.status(201).json({ message: 'Checklist filled successfully.', checkList });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating checklist.' });
  }
});


export const getfillchecklist = async (req, res) => {
  try {
    const allFilledAnswers = await FillSchema.find();

    // For each filled answer document, fetch original checklist and compare answers
    const results = await Promise.all(
      allFilledAnswers.map(async (filled) => {
        // Fetch checklist for this filled answer
        const checklist = await Schema.findById(filled.checklistId);
        if (!checklist) {
          return {
            filledId: filled._id,
            message: 'Checklist not found for this filled answer',
            data: filled,
          };
        }

        // Map answers with correctness check
        const answersWithStatus = filled.answers.map((ans) => {
          const question = checklist.answer_types.find(
            (q) => q._id?.toString() === ans.questionId?.toString()
          );
          if (!question) {
            return {
              questionId: ans.questionId,
              selectedOptionIndex: ans.selectedOptionIndex,
              isCorrect: false,
              message: 'Question not found in checklist',
            };
          }

          const isCorrect = question.corrcetAnswer === ans.selectedOptionIndex?.toString();

          return {
            questionId: ans.questionId,
            questionText: question.question_text,
            selectedOptionIndex: ans.selectedOptionIndex,
            correctAnswerIndex: question.corrcetAnswer,
            isCorrect,
          };
        });

        return {
          filledId: filled._id,
          checklistId: filled.checklistId,
          submittedAt: filled.submittedAt,
          answers: answersWithStatus,
        };
      })
    );

    res.json({
      message: 'All filled checklists fetched with correctness',
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: 'Failed to fetch filled checklists',
      success: false,
    });
  }
};
