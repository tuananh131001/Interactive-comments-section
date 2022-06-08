const Comment = require("../models/Comment");

const replyComment = async (req, res) => {
  const replyContent = req.body.content;
  const replyTo = req.body.replyingTo;

  const createdAt = "0 seconds ago";
  const score = 0;
  Comment.findOne(
    { "replies.user.username": replyTo },
    async (err, comment) => {
      try {
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
      } catch (err) {
        Comment.findOne({ "user.username": replyTo }, async (err, comment) => {
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
      }
    }
  );
};
const updateReply = async (req, res) => {
  if (req.params.id) {
    const comment = await Comment.findById(req.body.parent, (err, comment) => {
      comment.replies.id(req.params.id).content = req.body.content;
      comment.save();
    })
      .clone()
      .catch(function (err) {
        console.log(err);
      });
    const allComment = await Comment.find();
    res.status(201).json(allComment);
  }
};
const deleteReply = async (req, res) => {
  if (req.body.parent && req.body.child) {
    res.reply = await Comment.findById(req.body.parent, (err, comment) => {
      comment.replies.id(req.body.child).remove();
      comment.save();
    })
      .clone()
      .catch(function (err) {
        console.log(err);
      });
  }
  res.status(200).json({ message: "Deleted " });
};
module.exports = {
  replyComment,
  deleteReply,
  updateReply,
};
