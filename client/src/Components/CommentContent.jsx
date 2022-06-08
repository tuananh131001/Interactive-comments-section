import axios from "axios";
import { comment } from "postcss";
import React, { useState, useEffect, createContext } from "react";
import { FaReply } from "react-icons/fa";
import Modal from "./Modal";
const HOST = import.meta.env.VITE_URL;

function CommentContent({
  isChild,
  childId,
  commentData,
  parentId,
  loadComment,
  setReplyTo,
  editStatus,
  setEditStatus,
  setModal,
  isReply,
  setIsReply,
}) {
  const handleReplyTo = (isChild, parentId, childId) => {
    isReply ? setIsReply(false) : setIsReply(true);
    isChild ? setReplyTo(childId) : setReplyTo(parentId);
    loadComment();
  };

  const voteComment = (parentId, childId) => {
    const vote = {
      parentId: parentId,
      childId: childId,
    };
    axios.post(`${HOST}/comment/vote`, vote).then((res) => {
      loadComment();
    });
  };
  const devoteComment = (parentId, childId) => {
    const vote = {
      parentId: parentId,
      childId: childId,
    };
    axios.post(`${HOST}/comment/devote`, vote).then((res) => {
      loadComment();
    });
  };

  return (
    <div className="flex flex-col gap-5">
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
          <button
            className=" text-upDown hover:opacity-80"
            onClick={(x) => voteComment(parentId, childId)}
          >
            +
          </button>
          <button className="text-upDown font-bold ">
            {commentData.score}
          </button>
          <button
            className="text-upDown hover:opacity-80"
            onClick={(x) => devoteComment(parentId, childId)}
          >
            -
          </button>
        </div>
        <div className="reply flex gap-2 items-center">
          {" "}
          {commentData.user.username === "juliusomo" ? (
            <figure className="flex items-center gap-2">
              <div className="delete flex items-center gap-2 text-mention">
                <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                    fill="#ED6368"
                  />
                </svg>
                <label
                  for="my-modal"
                  className="text-red modal-button cursor-pointer hover:opacity-80"
                  onClick={(x) =>
                    setModal({
                      isChild: isChild,
                      childId: childId,
                      parentId: parentId,
                    })
                  }
                >
                  Delete
                </label>
              </div>
              <div className="reply flex items-center gap-2 text-mention hover:opacity-80">
                <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                    fill="#5357B6"
                  />
                </svg>
                <button
                  onClick={(x) =>
                    editStatus ? setEditStatus(false) : setEditStatus(true)
                  }
                >
                  Edit
                </button>
              </div>
            </figure>
          ) : null}
          {commentData.user.username !== "juliusomo" ? (
            <div className="flex items-center gap-1 hover:opacity-80">
              <FaReply />{" "}
              <button
                className="text-upDown font-bold"
                onClick={(x) => handleReplyTo(isChild, parentId, childId)}
              >
                Reply
              </button>
            </div>
          ) : null}
        </div>
      </figure>
    </div>
  );
}

export default CommentContent;
