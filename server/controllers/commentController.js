const Comment = require("../models/Comment");

const getComment = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getCommentById = async (req, res) => {
  try {
    const comments = await Comment.findById(req.params.id);

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const postComment = async (req, res) => {
  console.log(req.body);
  const comments = new Comment(req.body);
  try {
    const newItem = await comments.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const updateComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  comment.content = req.body.content;
  await comment.save();
  const allComment = await Comment.find()
  res.status(201).json(allComment);
};

const deleteComment = async (req, res) => {
  try {
    res.comment = await Comment.findByIdAndDelete(req.params.id);
    await res.comment.remove();
    res.json({ message: "Deleted " });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCommentById,
  getComment,
  postComment,
  deleteComment,
  updateComment
};
