const express = require("express");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/post", postRoutes);
module.exports = app;
