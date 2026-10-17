import { useState } from "react";
import { InterviewContext } from "./interview.context.js";

const InterviewProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(null);
  const [report, setReport] = useState(null);
  const [reports, setReports] = useState([]);

  return (
    <InterviewContext.Provider
      value={{
        loading,
        setLoading,
        loadingMessage,
        setLoadingMessage,
        report,
        setReport,
        reports,
        setReports,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export { InterviewProvider };
