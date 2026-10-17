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
const requiredEnvironmentVariables = [
  "MONGO_URI",
  "JWT_SECRET",
  "SKILLSCAN_GENAI_API_KEY",
];

const startServer = async () => {
  const missingVariables = requiredEnvironmentVariables.filter(
    (name) => !process.env[name]
  );

  if (missingVariables.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVariables.join(", ")}`
    );
  }

  await connectToDB();

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server:", error.message);
  process.exitCode = 1;
});
