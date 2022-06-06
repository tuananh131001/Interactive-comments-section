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
    const comments = await findComment(req, res);

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
const replyComment = async (req, res) => {
  const replyContent = req.body.content;
  const parentId = req.body.parentId;
  const replyTo = req.body.replyingTo;

  const createdAt = "0 seconds ago";
  const score = 0;
  console.log("active")
 Comment.findById(parentId, async (err, comment) => {
    const commentReply = {
      content: replyContent,
      createdAt: createdAt,
      score: score,
      replyingTo: replyTo,
      user: req.body.user,
    };
    await comment.replies.push(commentReply);
    await comment.save((err) => {
      err ? console.log(err) : console.log("reply saved");
    });
    await res.redirect("/comment");
  });
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
const deleteReply = async (req, res) => {
  try {
    res.comment = await Comment.findById(req.body.parent, (err, comment) => {
      comment.replies.id(req.body.id).remove();
      comment.save((err) => {
        error ? console.log(err) : console.log("reply deleted");
      });
    });
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
  //   updateCart,
  deleteComment,
  replyComment,
  deleteReply,
};
