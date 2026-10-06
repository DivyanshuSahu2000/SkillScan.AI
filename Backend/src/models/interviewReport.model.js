import mongoose from "mongoose";

const technicalQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Question is required"],
  },
  intention: {
    type: String,
    required: [true, "Intention required"],
  },
  answer: {
    type: String,
    required: [true, "Answer is required"],
  },
});
const behaviouralQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Question is required"],
  },
  intention: {
    type: String,
    required: [true, "Intention required"],
  },
  answer: {
    type: String,
    required: [true, "Answer is required"],
  },
});
const skillGapSchema = new mongoose.Schema({
  skill: { type: String, required: [true, "Skills Are Required"] },
  sevierty: {
    type: String,
    enum: ["low", "medium", "high"],
    required: [true, "Severity is required"],
  },
});
const preparatioPlanSchema = new mongoose.Schema({
  day: {
    type: Number,
    reqired: [true, "Day is Required"],
  },
  focus: {
    type: String,
    required: [true, "Focus is required"],
  },
  tasks: {
    type: String,
    required: [true, "Tasks is Required"],
  },
});

const interviewReportSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: String,
      required: [true, "Job Description Required"],
    },
    resume: {
      type: String,
    },
    selfDescription: {
      type: String,
    },
    technicalQuestions: [technicalQuestionSchema],
    behaviouralQuestions: [behaviouralQuestionSchema],
    skillGap: [skillGapSchema],
    preparationPlan: [preparatioPlanSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const interviewReportModel = mongoose.model(
  "InterviewReport",
  interviewReportSchema
);
export default interviewReportModel;
