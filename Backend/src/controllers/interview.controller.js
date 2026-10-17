import interviewReportModel from "../models/interviewReport.model.js";
import generateInterviewReport from "../services/ai.services.js";
import { PDFParse } from "pdf-parse";

/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */
const generateInterViewReportController = async (req, res) => {
  const selfDescription =
    typeof req.body?.selfDescription === "string"
      ? req.body.selfDescription.trim()
      : "";
  const jobDescription =
    typeof req.body?.jobDescription === "string"
      ? req.body.jobDescription.trim()
      : "";
  if (!jobDescription) {
    return res.status(400).json({
      message: "Job description is required.",
    });
  }
  if (!req.file && !selfDescription) {
    return res.status(400).json({
      message: "Upload a PDF resume or provide a self-description.",
    });
  }

  let resumeText = "";
  if (req.file) {
    const pdfHeader = req.file.buffer
      .toString("latin1", 0, 1024)
      .includes("%PDF-");
    if (!pdfHeader) {
      return res.status(400).json({ message: "Resume must be a PDF file." });
    }

    const parser = new PDFParse({ data: req.file.buffer });
    try {
      const resumeContent = await parser.getText();
      resumeText = resumeContent.text;
    } catch (error) {
      error.status = 400;
      error.type = "INVALID_RESUME_PDF";
      throw error;
    } finally {
      await parser.destroy();
    }
  }

  if (!resumeText.trim() && !selfDescription) {
    return res.status(400).json({
      message:
        "Could not extract readable text from the resume. Upload a text-based PDF or provide a self-description.",
    });
  }

  const interviewReportByAi = await generateInterviewReport({
    resume: resumeText,
    selfDescription,
    jobDescription,
  });
  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume: resumeText,
    selfDescription,
    jobDescription,
    ...interviewReportByAi,
  });
  return res.status(201).json({
    message: "Interview report generated successfully",
    interviewReport,
  });
};

/**
 * @description Controller to get interview report by interviewId.
 */
const getInterviewReportByIdController = async (req, res) => {
  const { interviewID } = req.params;
  const interviewReport = await interviewReportModel.findOne({
    _id: interviewID,
    user: req.user.id,
  });
  if (!interviewReport) {
    return res.status(404).json({
      message: "Interview Report not found",
    });
  }
  return res.status(200).json({
    message: "Interview Report Fetched Successfully.",
    interviewReport,
  });
};

/**
 * @description Controller to get all interview reports of logged in user.
 */
const getAllInterviewReportsController = async (req, res) => {
  const interviewReports = await interviewReportModel
    .find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .select(
      "-resume -selfDescription -jobDescription -__v -technicalQuestions -behaviouralQuestions -skillGaps -preparationPlan"
    );

  return res.status(200).json({
    message: "Interview reports fetched successfully.",
    interviewReports,
  });
};

export {
  generateInterViewReportController,
  getInterviewReportByIdController,
  getAllInterviewReportsController,
};
