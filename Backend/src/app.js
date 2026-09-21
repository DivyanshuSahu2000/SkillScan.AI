import express from "express";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.get("/", (req, res) => {
  res.send("Success");
});
app.use(express.json());
app.use(cookieParser());
// using all the routes here
app.use("/api/auth", authRouter);

export default app;

// module.exports = app     *export  method for common Js as in require method
