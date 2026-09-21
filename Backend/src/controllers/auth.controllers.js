import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import tokenBlacklistModel from "../models/blacklist.model.js";

/**
 * @name registerUserController
 * @description
 * @acess Public
 */

export const registerUserController = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please fill all details",
      });
    }
    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserAlreadyExists) {
      return res.status(400).json({
        message: "User Already registered",
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username,
      email,
      password: hash,
    });
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("token", token);
    res.status(201).json({
      message: "USer Registered Successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to Register ",
      error: error.message,
    });
  }
};
/**
 *
 * @name loginUserController
 * @description login a user, expects email, password in request body
 * @access Public
 */
const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
        username: user.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("token", token);
    res.status(200).json({
      message: "User loggedin",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to Login",
      error: error.message,
    });
  }
};

/**
 * @name logoutController
 * @description clear token from user cookie and add the token in blacklist
 * @access private
 */
const logoutUserController = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (token) {
      await tokenBlacklistModel.create({ token });
    }
    res.clearCookie("token");

    res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to logout",
      error: error.message,
    });
  }
};

/**
 *
 * @name getmeController
 * @description login a user, expects email, password in request body
 * @access Public
 */
const getMeController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    res.status(200).json({
      message: "User detail fetch successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "fetch failed",
    });
  }
};
export default {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController,
};
