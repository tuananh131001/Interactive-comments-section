import React, { useState, useEffect } from "react";
import axios from "axios";
import data from "../asserts/data.json";
import Comment from "../Components/Comment";
import AddComment from "../Components/AddComment";

function Home() {
  const [comments, setComments] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  function loadComments() {
    axios.get("http://localhost:5000/comment").then((res) => {
      setComments(res.data);
      // setCurrentUser(res.data[0].currentUser);
    });
  }
  useEffect(() => {
    loadComments()
  }, []);
  return (
    <div className=" h-full  flex flex-col flex-end items-center bg-bgColor">
      <div className="comments-list flex flex-col gap-5 items-end  px-4 py-6">
        {/* Comments */}
        {comments
          ? comments.map((comment) => (
              <div className="flex flex-col gap-5 ">
                <Comment key={comment._id} commentId={comment._id} commentData={comment}></Comment>
                {/* Sub comments of the comment */}
                <div className="sub-comments flex flex-col items-end gap-5 border-line border-l-2">
                  {comment.replies
                    ? comment.replies.map((child) => (
                        <div className="w-11/12">
                          <Comment key={comment._id} commentId={comment._id} loadComment={loadComments()} commentData={child}></Comment>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            ))
          : null}

        <AddComment loadComment = {loadComments()}></AddComment>
      </div>
    </div>
  );
}

export default Home;
