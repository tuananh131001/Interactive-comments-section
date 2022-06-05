import axios from "axios";
import React, { useState } from "react";

function AddComment({ userImage,loadComment }) {
  const [newComment, setNewComment] = useState("");
  const printComment = () => {
    let newCommentObject = {
      id: 3,
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
        console.log(res)
        loadComment()
      });
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
          <button className="btn btn-primary" onClick={(x) => printComment()}>
            SEND
          </button>
        </div>
      </section>
    </>
  );
}

export default AddComment;
