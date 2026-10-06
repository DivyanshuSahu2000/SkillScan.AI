import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { generateInterViewReportController } from "../controllers/interview.controller.js";
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

export default interviewRouter;
