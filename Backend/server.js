import app from "./src/app.js";
import dotenv from "dotenv";
import cors from "cors";
import connectToDB from "./src/config/db.js";

dotenv.config();
app.use(cors());
const PORT = process.env.PORT;
connectToDB();
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});
