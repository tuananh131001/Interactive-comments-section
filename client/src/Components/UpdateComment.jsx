import axios from "axios";
import React, { useEffect, useState } from "react";
const HOST = import.meta.env.VITE_URL;
function UpdateComment({
  commentData,
  loadComment,
  setEditStatus,
  setComments,
  isChild,
  parentId,
  childId,
}) {
  const [newComment, setNewComment] = useState(commentData.content);

  const updateComment = (parentId, content) => {
    const newContent = {
      content: content,
    };
    axios.put(HOST + "/comment/" + parentId, newContent).then((res) => {
      setComments(res.data);
      loadComment();
      setEditStatus(false);
    });
  };
  const updateReply = (parentId, childId, content) => {
    const newContent = {
      parent: parentId,
      content: content,
    };
    axios.put(HOST + "/comment/reply/" + childId, newContent).then((res) => {
      setComments(res.data);
      loadComment();
      setEditStatus(false);
    });
  };
  const handleUpdate = (isChild, parentId, childId, newComment) => {
    isChild
      ? updateReply(parentId, childId, newComment)
      : updateComment(parentId, newComment);
  };
  return (
    <>
      {" "}
      <div className="flex flex-col gap-5 col-1/3">
        <textarea
          defaultValue={commentData.content}
          className="textarea textarea-bordered w-full"
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button
          className="btn btn-sm"
          onClick={(x) => handleUpdate(isChild, parentId, childId, newComment)}
        >
          UPDATE
        </button>
      </div>
    </>
  );
}

export default UpdateComment;
