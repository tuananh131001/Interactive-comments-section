import React, { useState, useEffect,useId } from "react";
import axios from "axios";
import data from "../asserts/data.json";
import Comment from "../Components/Comment";
import AddComment from "../Components/AddComment";

function Home() {
  const [comments, setComments] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [replyTo, setReplyTo] = useState("");

  const idAddComment = useId()
  function loadComments() {
    axios.get("http://localhost:5000/comment").then((res) => {
      console.log(replyTo);
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
          ? comments.map((parentComment) => (
              <div className="flex flex-col gap-5 ">
                <Comment key={parentComment._id} parentId={parentComment._id} commentData={parentComment} loadComment={loadComments} replyTo={setReplyTo}></Comment>
                {/* Sub comments of the comment */}
                <div className="sub-comments flex flex-col items-end gap-5 border-line border-l-2">
                  {parentComment.replies
                    ? parentComment.replies.map((child) => (
                        <div className="w-11/12">
                          <Comment key={child._id} isChild={true} parentName={parentComment.user.username} parentId={parentComment._id} childId={child._id}  commentData={child} loadComment={loadComments} replyTo={setReplyTo} ></Comment>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            ))
          : null}

        <AddComment key={idAddComment} loadComment={loadComments} replyTo={replyTo} ></AddComment>
      </div>
    </div>
  );
}

export default Home;
