import express from "express";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import interviewRouter from "./routes/interview.routes.js";
import multer from "multer";

const app = express();
app.get("/", (req, res) => {
  res.send("Success");
});
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
// using all the routes here
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  console.error("Request failed:", error);
  const isFileSizeError =
    error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE";
  const isMulterError = error instanceof multer.MulterError;
  const status =
    isFileSizeError ? 413 : isMulterError ? 400 : error.status || 500;

  return res.status(status).json({
    message:
      isFileSizeError
        ? "Resume file must be 5 MB or smaller."
        : error.type === "INVALID_RESUME_PDF"
          ? "Could not read the uploaded PDF."
          : status === 503
            ? "The AI service is temporarily unavailable. Please try again."
            : status === 413
              ? "Request content is too large."
              : "The request could not be completed. Please try again.",
  });
});

export default app;

// module.exports = app     *export  method for common Js as in require method
