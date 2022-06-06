import axios from "axios";
import React, { useState } from "react";

function AddComment({ userImage, loadComment, replyTo }) {
  const [newComment, setNewComment] = useState("");
  const postComment = () => {
    let newCommentObject = {
      content: newComment,
      createdAt: "1 month ago",
      score: 0,
      user: {
        image: {
          png: "./images/avatars/image-amyrobson.png",
          webp: "./images/avatars/image-amyrobson.webp",
        },
        username: "Cho Rach",
      },
      replies: [],
    };
    axios
      .post("http://localhost:5000/comment", newCommentObject)
      .then((res) => {
        console.log(res);
        console.log("comment ne")
        loadComment();
      });
  };
  const replyToComment = (replyTo) => {
    let replyCommentObject = {
      parentId: replyTo,
      content: newComment,
      createdAt: "1 month ago",
      score: 0,
      replyingTo: replyTo,
      user: {
        image: {
          png: "./images/avatars/image-amyrobson.png",
          webp: "./images/avatars/image-amyrobson.webp",
        },
        username: "Cho Rach",
      },
    };
    axios
      .post("http://localhost:5000/comment/reply", replyCommentObject)
      .then((res) => {
        console.log(res);
        console.log("reply")
        loadComment();
      });
  };
  const doComment = () => {
    console.log(replyTo);

    replyTo ? replyToComment(replyTo) : postComment();
  };
  return (
    <>
      <section className="comment bg-white p-4 rounded-xl drop-shadow-lg flex flex-col gap-3 w-full ">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="textarea textarea-bordered w-full"
          placeholder="Add a comment..."
        ></textarea>
        <div className="bottom flex justify-between items-center">
          <img src={`src/asserts/${userImage}`} alt="" className=" w-8" />
          <button className="btn btn-primary" onClick={(x) => doComment()}>
            SEND
          </button>
        </div>
      </section>
    </>
  );
}

export default AddComment;
