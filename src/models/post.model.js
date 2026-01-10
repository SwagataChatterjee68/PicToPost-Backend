const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});
const postModel = mongoose.model("posts", postSchema);
module.exports = postModel;
