import React, { useState } from "react";
import data from "../asserts/data.json";

function AddComment({ userImage }) {
  const [newComment, setNewComment] = useState("");
  const printComment = () => {
    let newCommentObject = {
      id: 3,
      content: { newComment },
      createdAt: "1 month ago",
      score: 12,
      user: {
        image: {
          png: "./images/avatars/image-amyrobson.png",
          webp: "./images/avatars/image-amyrobson.webp",
        },
        username: "Cho Rach",
      },
      replies: [],
    };
    data.comments.push(newCommentObject);
    console.log(data.comments)
  };
  return (
    <>
      <section className="comment bg-white p-4 rounded-xl drop-shadow-lg flex flex-col gap-3 w-full ">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          class="textarea textarea-bordered w-full"
          placeholder="Add a comment..."
        ></textarea>
        <div className="bottom flex justify-between items-center">
          <img src={`src/asserts/${userImage}`} alt="" className=" w-8" />
          <button className="btn btn-primary" onClick={printComment()}>
            SEND
          </button>
        </div>
      </section>
    </>
  );
}

export default AddComment;
