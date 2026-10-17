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
  severity: {
    type: String,
    enum: ["low", "medium", "high"],
    required: [true, "Severity is required"],
  },
});
const preparationPlanSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: [true, "Day is Required"],
  },
  focus: {
    type: String,
    required: [true, "Focus is required"],
  },
  tasks: [
    {
      type: String,
      required: [true, "Task is required"],
    },
  ],
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
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    technicalQuestions: [technicalQuestionSchema],
    behaviouralQuestions: [behaviouralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    title: {
      type: String,
      required: [true, "Job title  is required"],
    },
  },
  { timestamps: true }
);

const interviewReportModel = mongoose.model(
  "InterviewReport",
  interviewReportSchema
);
export default interviewReportModel;
