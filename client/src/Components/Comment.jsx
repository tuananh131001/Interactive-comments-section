import axios from "axios";
import { comment } from "postcss";
import React, { useState, useEffect, createContext } from "react";
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
}) {
  const [editStatus, setEditStatus] = useState(false);

  return (
    <>
      <section className="comment bg-white p-4 rounded-xl drop-shadow-lg flex flex-col gap-3 ">
        <div className="flex items-center gap-4">
          <img
            src={`src/asserts/${commentData.user.image.png}`}
            alt=""
            className=" w-8"
          />
          <h3 className="font-bold">{commentData.user.username}</h3>
          <h3 className="text-paragraph">{commentData.createdAt}</h3>
          <button
            className="btn btn-sm"
            onClick={(x) =>
              editStatus ? setEditStatus(false) : setEditStatus(true)
            }
          >
            Edit
          </button>
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
          />
        )}
      </section>
    </>
  );
}

export default Comment;
