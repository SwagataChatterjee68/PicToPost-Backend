const postModel = require("../models/post.model");
const generateCaption = require("../services/ai.service");
const uploadFile = require("../services/storage.service");
const { v4: uuidv4 } = require("uuid");
const createPostController = async (req, res) => {
  const file = req.file;
  const base64ImageFile = Buffer.from(file.buffer).toString("base64");
  const caption = await generateCaption(base64ImageFile);
  const result = await uploadFile(file.buffer, `${uuidv4()}`);

  const post=await postModel.create({
    caption:caption,
    image:result.url,
    user:req.user._id
  })

  res.json({
    message:"Post Created Successfully",
    caption
  })
};
module.exports = {
  createPostController,
};
