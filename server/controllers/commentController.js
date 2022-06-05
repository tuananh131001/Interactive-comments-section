const Comment = require("../models/Comment");
const getComment = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const postComment = async (req, res) => {
    console.log(req.body)
  const comments = new Comment(req.body);
  try {
    const newItem = await comments.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports = {
  getComment,
  postComment,
  //   updateCart,
};
