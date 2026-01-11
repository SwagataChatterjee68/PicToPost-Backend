const postModel = require("../models/post.model");
const generateCaption = require("../services/ai.service");
const uploadFile = require("../services/storage.service");
const { v4: uuidv4 } = require("uuid");

const createPostController = async (req, res) => {
  try {
    // 1️⃣ Ensure file exists
    if (!req.file) {
      return res.status(400).json({
        message: "Image file is required",
      });
    }

    // 2️⃣ Ensure user exists (extra safety)
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const file = req.file;

    // 3️⃣ Convert image to base64
    const base64ImageFile = Buffer.from(file.buffer).toString("base64");

    // 4️⃣ Generate caption using AI
    const caption = await generateCaption(base64ImageFile);

    // 5️⃣ Upload image
    const uploadResult = await uploadFile(file.buffer, uuidv4());

    // 6️⃣ Save post in DB
    await postModel.create({
      caption,
      image: uploadResult.url,
      user: req.user._id,
    });

    // 7️⃣ Send response (ONLY ONCE)
    return res.status(200).json({
      message: "Post created successfully",
      caption,
    });
  } catch (error) {
    console.error("Create post error:", error);
    return res.status(500).json({
      message: "Failed to create post",
    });
  }
};

module.exports = {
  createPostController,
};
