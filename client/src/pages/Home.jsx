import React, { useState, useEffect } from "react";
import data from "../asserts/data.json";
import Comment from "../Components/Comment";
import AddComment from "../Components/AddComment";
function Home() {
  const [comments, setComments] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    setComments(data.comments);
    setCurrentUser(data.currentUser);
  }, []);
  return (
    <div className=" h-full flex flex-col flex-end items-center bg-bgColor">
      <div className="comments-list flex flex-col gap-5 items-end  px-4 py-6">
        {/* Comments */}
        {comments
          ? comments.map((comment) => (
              <div className="flex flex-col gap-5 ">
                <Comment commentData={comment}></Comment>
                {/* Sub comments of the comment */}
                <div className="sub-comments flex flex-col items-end gap-5 border-line border-l-2">
                  {comment.replies
                    ? comment.replies.map((child) => (
                        <div className="w-11/12">
                          <Comment commentData={child}></Comment>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            ))
          : null}
        {currentUser ? (
          <AddComment userImage={currentUser.image.png}></AddComment>
        ) : null}
      </div>
    </div>
  );
}

export default Home;
