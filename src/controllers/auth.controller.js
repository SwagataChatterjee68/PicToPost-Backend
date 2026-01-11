const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const registerController = async (req, res) => {
  const { username, password, email } = req.body;
  const existingUser = await userModel.findOne({ username });
  if (existingUser) {
    return res.status(409).json({
      message: "User exists already",
    });
  }
  const user = await userModel.create({
    username,
    password: await bcrypt.hash(password, 10),
    email,
  });

  const isProd = process.env.NODE_ENV === "production";

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token, {
    httpOnly: true, // JS cannot access it
    secure: isProd, // true on HTTPS (Render)
    sameSite: isProd ? "none" : "lax",
    path: "/", // important
  });

  res.status(200).json({
    message: "Authenticated",
    username: user.username,
  });

  res.status(200).json({
    username: user.username,
  });
};
const loginController = async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username });

  if (!user) {
    return res.status(401).json({
      message: "User is not registered",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Incorrect Password",
    });
  }

  const isProd = process.env.NODE_ENV === "production";

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token, {
    httpOnly: true, // JS cannot access it
    secure: isProd, // true on HTTPS (Render)
    sameSite: isProd ? "none" : "lax",
    path: "/", // important
  });

  res.status(200).json({
    message: "Authenticated",
    username: user.username,
  });

  res.status(200).json({
    username: user.username,
  });
};

const logoutController = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(200).json({ message: "Logged out" });
};

const profileController = async (req, res) => {
  res.status(200).json({
    authenticated: true,
    username: req.user.username,
  });
};
module.exports = {
  registerController,
  loginController,
  logoutController,
  profileController,
};
