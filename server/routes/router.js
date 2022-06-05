const express = require("express");
const app = express();
const router = express.Router();
const {getComment,postComment} = require("../controllers/commentController")

router.route('/').get(getComment).post(postComment)
module.exports = router;
