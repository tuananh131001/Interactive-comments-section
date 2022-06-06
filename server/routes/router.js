const express = require("express");
const app = express();
const router = express.Router();
const {
  getCommentById,
  getComment,
  postComment,
  deleteComment,
  replyComment,
  deleteReply,
} = require("../controllers/commentController");

router.route("/reply").post(replyComment).delete(deleteReply);

router.route("/").get(getComment).post(postComment);
router.route("/:id").get(getCommentById).delete(deleteComment);
module.exports = router;
