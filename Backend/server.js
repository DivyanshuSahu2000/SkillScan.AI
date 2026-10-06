import "dotenv/config";
import app from "./src/app.js";
import connectToDB from "./src/config/db.js";
// import {
//   resume,
//   selfDescription,
//   jobDescription,
// } from "./src/services/test.js";
// import generateInterviewReport from "./src/services/ai.services.js";

// import invokeGeminiAi from "./src/services/ai.services.js";

// invokeGeminiAi();
// generateInterviewReport({ resume, selfDescription, jobDescription });
const PORT = process.env.PORT;
connectToDB();
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});

// import dotenv from "dotenv";
// dotenv.config();
