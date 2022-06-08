import axios from "axios";
import React, { useState } from "react";
const HOST = import.meta.env.VITE_URL;

function AddComment({ userImage, loadComment, replyTo, commentInput }) {
  const [newComment, setNewComment] = useState("");
  const postComment = () => {
    let newCommentObject = {
      content: newComment,
      createdAt: "1 month ago",
      score: 0,
      user: {
        image: {
          png: "./images/avatars/image-juliusomo.png",
          webp: "./images/avatars/image-juliusomo.webp",
        },
        username: "juliusomo",
      },
      replies: [],
    };
    axios.post(HOST + "/comment", newCommentObject).then((res) => {
      console.log(res);
      loadComment();
    });
  };
  const getUserName = async (parentId) => {
    return await axios.get(HOST + `/comment/${parentId}`).then((res) => {
      return res.data.user.username;
    });
  };
  const replyToComment = async (replyTo) => {
    const removed = newComment.substring(newComment.indexOf(" ") + 1);
    const parentName =  await getUserName(replyTo);
    let replyCommentObject = {
      parentId: replyTo,
      content: removed,
      createdAt: "1 month ago",
      score: 0,
      replyingTo: parentName,
      user: {
        image: {
          png: "./images/avatars/image-juliusomo.png",
          webp: "./images/avatars/image-amyrjuliusomoobson.webp",
        },
        username: "juliusomo",
      },
    };

    await axios.post(HOST + "/comment/reply", replyCommentObject).then((res) => {
      loadComment();
    });
  };
  const doComment = () => {
    replyTo ? replyToComment(replyTo) : postComment();
  };
  return (
    <>
      <section className="comment bg-white p-4 rounded-xl drop-shadow-lg flex flex-col gap-3 w-full ">
        <textarea
          ref={commentInput}
          onChange={(e) => setNewComment(e.target.value)}
          className="textarea textarea-bordered w-full"
          placeholder="Add a comment..."
        ></textarea>
        <div className="bottom flex justify-between items-center">
          <img
            src="src/asserts/./images/avatars/image-juliusomo.png"
            alt=""
            className=" w-8"
          />
          <button className="btn btn-primary" onClick={(x) => doComment()}>
            SEND
          </button>
        </div>
      </section>
    </>
  );
}

export default AddComment;
