
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "provide required fields..." });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid credentials..." });
    }
    const isUser = await User.findOne({ email });
    if (!isUser) {
      return res.status(400).json({ message: "Invalid credentials..." });
    }
    if (!bcrypt.compareSync(password, isUser.password)) {
      return res.status(400).json({ message: "Invalid credentials..." });
    }
    const token = jwt.sign({ id: isUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie(
      "Token",
      token,
      { expires: new Date(Date.now() + 8 * 3600000) },
      { httpOnly: true, secure: true }
    );
    res.json({ message: "login successfully...", data: isUser });
  } catch (error) {
    res.status(500).json({
      Error: "Error to login",
      message: error.message,
    });
  }
};

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "provide required fields..." });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email is not valid..." });
    }
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ message: "Provide strong password" });
    }
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(400).json({ message: "User already exist..." });
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    const user = new User({
      name,
      email,
      password: hashPassword,
    });

    const saveUser = await user.save();
    const token = jwt.sign({ id: saveUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie(
      "Token",
      token,
      { expires: new Date(Date.now() + 8 * 3600000) },
      { httpOnly: true, secure: true }
    );
    res.json({
      message: "User register successfully..",
      data: saveUser,
    });
  } catch (error) {
    res.status(500).json({
      Error: "Error to signup",
      message: error.message,
    });
  }
};

const logOut = async (req, res) => {
  try {
    res.clearCookie("Token");
    res.json({ message: "Logout successfully...." });
  } catch (error) {
    res.status(500).json({
      Error: "Error to logout",
      message: error.message,
    });
  }
};

const trackLogin = async (req, res) => {
  try {
    return res.json({
      success: true,
      message: "User is logged in",
      data: req.user,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      Error: "Error to track login",
      message: error.message,
    });
  }
};

export { login, signUp, logOut, trackLogin };
