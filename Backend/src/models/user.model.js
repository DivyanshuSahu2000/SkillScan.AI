import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: [true, "username already taken"],
    required: true,
  },
  email: {
    type: String,
    unique: [true, "Email Already Registered"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
