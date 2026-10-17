import { useCallback, useContext } from "react";
import { InterviewContext } from "../interview.context.js";
import {
  generateInterviewReport,
  getAllInterviewReports,
  getInterviewReportById,
} from "../services/interview.api.js";

export const useInterview = () => {
  const context = useContext(InterviewContext);

  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }

  const {
    loading,
    setLoading,
    loadingMessage,
    setLoadingMessage,
    report,
    setReport,
    reports,
    setReports,
  } = context;

  const generateReport = useCallback(async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    setLoadingMessage({
      message: "Generating your interview plan",
      detail: "Analyzing your profile and job description to build a personalized strategy.",
    });
    setLoading(true);
    try {
      const response = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });
      setReport(response.interviewReport);
      return response.interviewReport;
    } finally {
      setLoading(false);
      setLoadingMessage(null);
    }
  }, [setLoading, setLoadingMessage, setReport]);

  const getReportById = useCallback(async (interviewId) => {
    setLoadingMessage({
      message: "Fetching your interview report",
      detail: "Loading your questions, skill gaps, and preparation roadmap.",
    });
    setLoading(true);
    setReport(null);
    try {
      const response = await getInterviewReportById(interviewId);
      setReport(response.interviewReport);
      return response.interviewReport;
    } finally {
      setLoading(false);
      setLoadingMessage(null);
    }
  }, [setLoading, setLoadingMessage, setReport]);

  const getReports = useCallback(async () => {
    setLoadingMessage({
      message: "Loading your reports",
      detail: "Fetching your saved interview plans.",
    });
    setLoading(true);
    try {
      const response = await getAllInterviewReports();
      setReports(response.interviewReports);
      return response.interviewReports;
    } finally {
      setLoading(false);
      setLoadingMessage(null);
    }
  }, [setLoading, setLoadingMessage, setReports]);

  return {
    loading,
    loadingMessage,
    report,
    reports,
    generateReport,
    getReportById,
    getReports,
  };
};
