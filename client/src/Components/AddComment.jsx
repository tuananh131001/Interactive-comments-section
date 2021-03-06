import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import imageJuliusomo from "/public/images/avatars/image-juliusomo.png"
const HOST = import.meta.env.VITE_URL;

function AddComment({ userImage, loadComment, replyTo,setIsReply, isReply }) {
  const [newComment, setNewComment] = useState("");
  const commentTextarea = useRef();

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
    const replyToName = await getUserName(replyTo);
    let replyCommentObject = {
      content: removed,
      createdAt: "1 month ago",
      score: 0,
      replyingTo: replyToName,
      user: {
        image: {
          png: "./images/avatars/image-juliusomo.png",
          webp: "./images/avatars/image-amyrjuliusomoobson.webp",
        },
        username: "juliusomo",
      },
    };

    await axios
      .post(HOST + "/comment/reply", replyCommentObject)
      .then((res) => {
        loadComment();
      });
  };
  const doComment = (replyTo) => {
    replyTo ? replyToComment(replyTo) : postComment();
    setIsReply(false)
  };
  const setMention = async () =>{
     replyTo ? commentTextarea.current.value =  `@${ await getUserName(replyTo)} `:null
  }
  useEffect(() => {
    setMention()
  }, [isReply]);
  return (
    <>
      <section className="comment bg-white p-4 rounded-xl drop-shadow-lg flex flex-col gap-3 w-full ">
        <textarea
          ref={commentTextarea}
          onChange={(e) => setNewComment(e.target.value)}
          className="textarea textarea-bordered w-full"
          placeholder="Add a comment..."
        ></textarea>
        <div className="bottom flex justify-between items-center">
          <img
            src={imageJuliusomo}
            alt=""
            className=" w-8"
          />
          <button className="btn btn-primary" onClick={(x) => doComment(replyTo)}>
            SEND
          </button>
        </div>
      </section>
    </>
  );
}

export default AddComment;
