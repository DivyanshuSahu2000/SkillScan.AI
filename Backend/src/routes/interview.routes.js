import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  generateInterViewReportController,
  getAllInterviewReportsController,
  getInterviewReportByIdController,
} from "../controllers/interview.controller.js";
import upload from "../middleware/file.middleware.js";

const interviewRouter = express.Router();

/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user self description,resume pdf and job description.
 * @access private
 */

interviewRouter.post(
  "/",
  authMiddleware.authUser,
  upload.single("resume"),
  generateInterViewReportController
);
interviewRouter.get("/", authMiddleware.authUser, getAllInterviewReportsController);
interviewRouter.get(
  "/report/:interviewID",
  authMiddleware.authUser,
  getInterviewReportByIdController
);

export default interviewRouter;
