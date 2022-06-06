const Comment = require("../models/Comment");

const addAllComment = async (req, res) => {
  Comment.deleteMany({},x=>console.log(x))
  const data = {
    comments: {
      id: 1,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: "1 month ago",
      score: 12,
      user: {
        image: {
          png: "./images/avatars/image-amyrobson.png",
          webp: "./images/avatars/image-amyrobson.webp",
        },
        username: "amyrobson",
      },
      replies: [],
    },
  };
  const comment = await new Comment(data.comments);
  comment.save();
};

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
  const allComment = await Comment.find();
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
  updateComment,
  addAllComment,
};
