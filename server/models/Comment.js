const mongoose = require("mongoose");
const commentEle = new mongoose.Schema({
  content: String,
  createdAt: String,
  score: Number,
  user: {
    image: {
      png: String,
      webp: String,
    },
    username: String,
  },
  replies: [
    {
      content: String,
      createdAt: String,
      score: Number,
      replyingTo: String,
      user: {
        image: {
          png: String,
          webp: String,
        },
        username: String,
      },
    },
  ],
});
module.exports = mongoose.model("Comment", commentEle);
