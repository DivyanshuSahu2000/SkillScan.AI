import app from "./src/app.js";
import dotenv from "dotenv";
import connectToDB from "./src/config/db.js";

dotenv.config();

const PORT = process.env.PORT;
connectToDB();
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});
