import axios from "axios";
import { comment } from "postcss";
import React, { useState, useEffect, createContext, useRef } from "react";
import { FaReply } from "react-icons/fa";
import CommentContent from "./CommentContent";
import UpdateComment from "./UpdateComment";

function Comment({
  isChild,
  childId,
  commentData,
  parentId,
  loadComment,
  replyTo,
  setComments,
  commentInput,
  setModal,
}) {
  const [editStatus, setEditStatus] = useState(false);
  return (
    <>
      <section className="comment bg-white p-4 rounded-xl drop-shadow-lg flex flex-col gap-3 ">
        <div className="flex items-center gap-3">
          <img
            src={`src/asserts/${commentData.user.image.png}`}
            alt=""
            className=" w-8"
          />
          <h3 className="font-bold">{commentData.user.username}</h3>
          {commentData.user.username === "juliusomo" ? (
            <h3 className=" text-white px-1 text-xs bg-upDown">you</h3>
          ) : null}

          <h3 className="text-paragraph">{commentData.createdAt}</h3>
        </div>{" "}
        {editStatus ? (
          <UpdateComment
            isChild={isChild}
            setComments={setComments}
            loadComment={loadComment}
            commentData={commentData}
            childId={childId}
            parentId={parentId}
            setEditStatus={setEditStatus}
          />
        ) : (
          <CommentContent
            replyTo={replyTo}
            loadComment={loadComment}
            commentData={commentData}
            isChild={isChild}
            childId={childId}
            parentId={parentId}
            editStatus={editStatus}
            setEditStatus={setEditStatus}
            commentInput={commentInput}
            setModal={setModal}
          />
        )}
      </section>
    </>
  );
}

export default Comment;
