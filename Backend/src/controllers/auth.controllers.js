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
    const username =
      typeof req.body?.username === "string" ? req.body.username.trim() : "";
    const email =
      typeof req.body?.email === "string"
        ? req.body.email.trim().toLowerCase()
        : "";
    const password = req.body?.password;

    if (
      typeof username !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !username ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      password.length < 8
    ) {
      return res.status(400).json({
        message: "Enter a username, a valid email, and a password of at least 8 characters.",
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
    res.cookie("token", token, { ...cookieOptions, maxAge: 24 * 60 * 60 * 1000 });
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Username or email is already registered",
      });
    }
    console.error("Failed to register user:", error);
    res.status(500).json({
      message: "Failed to register",
    });
  }
};

const cookieOptions = {
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  secure: process.env.NODE_ENV === "production",
};
/**
 *
 * @name loginUserController
 * @description login a user, expects email, password in request body
 * @access Public
 */
const loginUserController = async (req, res) => {
  try {
    const email =
      typeof req.body?.email === "string"
        ? req.body.email.trim().toLowerCase()
        : "";
    const password = req.body?.password;
    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

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
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("token", token, { ...cookieOptions, maxAge: 24 * 60 * 60 * 1000 });
    res.status(200).json({
      message: "User loggedin",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Failed to log in user:", error);
    res.status(500).json({
      message: "Failed to Login",
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
    const token = req.cookies?.token;
    if (token) {
      await tokenBlacklistModel.create({ token });
    }
    res.clearCookie("token", cookieOptions);

    res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Failed to log out user:", error);
    res.status(500).json({
      message: "Failed to logout",
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
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User detail fetch successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Failed to fetch user details:", error);
    res.status(500).json({
      message: "Failed to fetch user details",
    });
  }
};
export default {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController,
};
