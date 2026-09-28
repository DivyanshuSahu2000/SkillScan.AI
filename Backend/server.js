import "dotenv/config";
import app from "./src/app.js";
import connectToDB from "./src/config/db.js";
import invokeGeminiAi from "./src/services/ai.services.js";

invokeGeminiAi();
const PORT = process.env.PORT;
connectToDB();
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});

// import dotenv from "dotenv";
// dotenv.config();
