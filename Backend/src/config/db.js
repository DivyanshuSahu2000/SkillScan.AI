import mongoose from "mongoose";
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MonogDB Connected");
  } catch (error) {}
};
export default connectToDB;
