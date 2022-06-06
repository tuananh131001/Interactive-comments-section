const express = require("express");
const app = express();
const router = express.Router();
const {
  getCommentById,
  getComment,
  postComment,
  deleteComment,
  updateComment,
} = require("../controllers/commentController");
const { replyComment, deleteReply } = require("../controllers/replyController");
router.route("/reply").post(replyComment);
router.route("/reply/delete").post(deleteReply);

router.route("/").get(getComment).post(postComment);
router.route("/:id").get(getCommentById).put(updateComment).delete(deleteComment);
module.exports = router;
