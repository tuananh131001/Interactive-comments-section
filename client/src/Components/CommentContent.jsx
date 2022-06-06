import axios from "axios";
import { comment } from "postcss";
import React, { useState, useEffect, createContext } from "react";
import { FaReply } from "react-icons/fa";

function CommentContent({
  isChild,
  childId,
  commentData,
  parentId,
  loadComment,
  replyTo,
}) {
  const handleReplyTo = (id) => {
    isChild ? replyTo(id) : replyTo(parentId);
    loadComment();
  };
  const handleDeleteButton = (isChild, childId, parentId) => {
    isChild ? deleteReply(childId, parentId) : deleteComment(parentId);
  };
  const deleteComment = (id) => {
    axios.delete(`http://localhost:5000/comment/${id}`).then((res) => {
      loadComment();
    });
  };
  const deleteReply = (childId, parentId) => {
    const reply = {
      parent: parentId,
      child: childId,
    };
    axios
      .post(`http://localhost:5000/comment/reply/delete`, reply)
      .then((res) => {
        loadComment();
      });
  };

  return (
    <div>
      <p className="text-paragraph">
        {commentData.replyingTo ? (
          <span className=" text-mention font-bold">
            @{commentData.replyingTo}
          </span>
        ) : null}{" "}
        {commentData.content}
      </p>
      <figure className="flex justify-between items-center">
        <div className="vote bg-bgColor flex justify-center items-center p-2 gap-5 rounded-md">
          <button className=" text-upDown">+</button>
          <button className="text-upDown font-bold">{commentData.score}</button>
          <button className="text-upDown">-</button>
          <button
            className="btn btn-sm"
            onClick={(x) => handleDeleteButton(isChild, childId, parentId)}
          >
            Delete
          </button>
        </div>
        <div className="reply flex gap-2 items-center">
          {" "}
          <FaReply />
          <button
            className="text-upDown font-bold"
            onClick={(x) => handleReplyTo(parentId)}
          >
            Reply
          </button>
        </div>
      </figure>
    </div>
  );
}

export default CommentContent;
