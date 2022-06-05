const express = require("express");
const app = express();
const router = express.Router();
const {getComment,postComment,deleteComment} = require("../controllers/commentController")

router.route('/').get(getComment).post(postComment)
router.route('/:id').delete(deleteComment)

module.exports = router;
