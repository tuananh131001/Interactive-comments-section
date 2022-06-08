const Comment = require("../models/Comment");

const addAllComment = async (req, res) => {
  Comment.deleteMany({}, (x) => console.log(x));
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
  const data2 = {
    comments: {
      id: 2,
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: "2 weeks ago",
      score: 5,
      user: {
        image: {
          png: "./images/avatars/image-maxblagun.png",
          webp: "./images/avatars/image-maxblagun.webp",
        },
        username: "maxblagun",
      },
      replies: [
        {
          id: 3,
          content:
            "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: "1 week ago",
          score: 4,
          replyingTo: "maxblagun",
          user: {
            image: {
              png: "./images/avatars/image-ramsesmiron.png",
              webp: "./images/avatars/image-ramsesmiron.webp",
            },
            username: "ramsesmiron",
          },
        },
        {
          id: 4,
          content:
            "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          createdAt: "2 days ago",
          score: 2,
          replyingTo: "ramsesmiron",
          user: {
            image: {
              png: "./images/avatars/image-juliusomo.png",
              webp: "./images/avatars/image-juliusomo.webp",
            },
            username: "juliusomo",
          },
        },
      ],
    },
  };
  const comment = await new Comment(data.comments);
  const comment2 = await new Comment(data2.comments);
  await comment.save();
  await comment2.save();
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

const voteComment = async (req, res) => {
  if (req.body.parentId && req.body.childId) {
    const comment = await Comment.findById(
      req.body.parentId,
      (err, comment) => {
        comment.replies.id(req.body.childId).score =
          comment.replies.id(req.body.childId).score + 1;
        comment.save();
      }
    )
      .clone()
      .catch(function (err) {
        console.log(err);
      });
    res.json(comment);
  } else {
    const comment = await Comment.findById(req.body.parentId);
    comment.score = comment.score + 1;
    const newComment = comment.save();
    res.json(newComment);
  }
};
const devoteComment = async (req, res) => {
  if (req.body.parentId && req.body.childId) {
    const comment = await Comment.findById(
      req.body.parentId,
      (err, comment) => {
        comment.replies.id(req.body.childId).score =
          comment.replies.id(req.body.childId).score - 1;
        comment.save();
      }
    )
      .clone()
      .catch(function (err) {
        console.log(err);
      });
    res.json(comment);
  } else {
    const comment = await Comment.findById(req.body.parentId);
    comment.score = comment.score - 1;
    const newComment = comment.save();
    res.json(newComment);
  }
};

module.exports = {
  getCommentById,
  getComment,
  postComment,
  deleteComment,
  updateComment,
  addAllComment,
  voteComment,
  devoteComment,
};
