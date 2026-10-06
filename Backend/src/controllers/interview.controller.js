import interviewReportModel from "../models/interviewReport.model.js";
import generateInterviewReport from "../services/ai.services.js";
import { PDFParse } from "pdf-parse";

// //
// async function generateInterViewReportController(req, res) {
//   console.log("FILE:", req.file);
//   console.log("BODY:", req.body);

//   if (!req.file) {
//     return res.status(400).json({
//       message: "Resume file is required.",
//     });
//   }

//   const parser = new PDFParse({
//     data: req.file.buffer,
//   });

//   const resumeContent = await parser.getText();

//   // ...
// }

//
const generateInterViewReportController = async (req, res) => {
  ////////////
  // console.log("FILE:", req.file);
  // console.log("BODY:", req.body);

  if (!req.file) {
    return res.status(400).json({
      message: "Resume file is required.",
    });
  }
  const parser = new PDFParse({
    data: req.file.buffer,
  });

  const resumeContent = await parser.getText();

  ////////////
  //   const resumeContent = await new pdfParse.pdfParse(
  //     Uint8Array.from(req.file.buffer)
  //   ).getText();
  ////////////
  // const resumeContent = await new PDFParse({
  //   data: req.file.buffer,
  // }).getText();
  const { selfDescription, jobDescription } = req.body;

  const interviewReportByAi = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
  });
  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
    ...interviewReportByAi,
  });
  res.status(201).json({
    message: "Interview report generated successfully",
    interviewReport,
  });
};
export { generateInterViewReportController };
