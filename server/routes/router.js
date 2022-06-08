const express = require("express");
const app = express();
const router = express.Router();
const {
  getCommentById,
  getComment,
  postComment,
  deleteComment,
  updateComment,
  voteComment,
  devoteComment
} = require("../controllers/commentController");
const {
  replyComment,
  deleteReply,
  updateReply,
} = require("../controllers/replyController");

router.route("/reply").post(replyComment);
router.route("/reply/delete").post(deleteReply);
router.route("/reply/:id").put(updateReply);

router.route("/").get(getComment).post(postComment);
router
  .route("/:id")
  .get(getCommentById)
  .put(updateComment)
  .delete(deleteComment);
router.route("/vote").post(voteComment)
router.route("/devote").post(devoteComment)
module.exports = router
