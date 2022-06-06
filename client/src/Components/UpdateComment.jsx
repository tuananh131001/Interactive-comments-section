import axios from "axios";
import React, { useEffect, useState } from "react";

function UpdateComment({
  commentData,
  loadComment,
  setEditStatus,
  setComments,
}) {
  const [newComment, setNewComment] = useState();
  const updateComment = (id, content) => {
    const newContent = {
      content: content,
    };
    axios.put("http://localhost:5000/comment/" + id, newContent).then((res) => {
      setComments(res.data);
      loadComment();
      setEditStatus(false);
    });
  };
  const handleUpdate = () =>{
      
  }
  return (
    <>
      {" "}
      <div className="flex flex-col gap-5">
        <textarea
          defaultValue={commentData.content}
          className="textarea textarea-bordered w-full"
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button
          className="btn btn-sm"
          onClick={(x) => updateComment(commentData._id, newComment)}
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default UpdateComment;
