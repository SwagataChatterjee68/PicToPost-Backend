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

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
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
      message: "User Not Found",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Incorrect Password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);
  res.status(200).json({
    username: user.username,
  });
};

const logoutController = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out" });
};

module.exports = { registerController, loginController, logoutController };
