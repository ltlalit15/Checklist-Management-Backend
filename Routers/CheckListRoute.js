import express from "express";
import { getallchecklist, addchecklist,fillchecklist, getfillchecklist,deletechecklist, updatechecklist, getresponse } from "../Controllers/CheckListCtrl.js";
import { authMiddleware } from "../Middewares/authMiddleware.js";
import { upload } from "../Middewares/uploadMiddleware.js";
const router = express.Router();

router.get("/checklist", getallchecklist);
router.post("/checklist", authMiddleware, addchecklist);
router.post("/fillchecklist", fillchecklist)
router.get("/fillchecklist", getfillchecklist)
;
router.post(
    "/checklist/upload-answer-image",
    authMiddleware,
    upload.single("image"),
    (req, res) => {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }
        res.status(200).json({
            success: true,
            filename: req.file.filename,
            path: `/uploads/${req.file.filename}`,
            message: "Image uploaded successfully"
        });
    }
);

router.put("/checklist/:id", authMiddleware, updatechecklist);
router.delete("/checklist/:id", authMiddleware, deletechecklist);
router.get("/response", getresponse);

export default router;
