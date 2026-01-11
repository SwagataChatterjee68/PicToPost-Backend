const express = require("express");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: process.env.VITE_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.status(200).json({ status: "OK", message: "Backend running" });
});
app.use("/auth", authRoutes);
app.use("/post", postRoutes);

module.exports = app;
