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
  console.log(req.body);
  const comments = new Comment(req.body);
  try {
    const newItem = await comments.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const deleteComment = async (req, res) => {
  try {
    res.comment = await findComment(req, res);
    await res.comment.remove();
    res.json({ message: "Deleted " });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};
async function findComment(req, res) {
  let comment;
  try {
    comment = await Comment.findById(req.params.id);
    if (comment == null) {
      return res.status(404).json({ message: "Cannot find comment" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  return comment;
}
module.exports = {
  getComment,
  postComment,
  //   updateCart,
  deleteComment,
};
