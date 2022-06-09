import React, {
  useState,
  useEffect,
  useId,
} from "react";
import axios from "axios";
import Comment from "../Components/Comment";
import AddComment from "../Components/AddComment";
import Modal from "../Components/Modal";
const HOST = import.meta.env.VITE_URL;

function Home() {
  const [comments, setComments] = useState("");
  const [replyTo, setReplyTo] = useState("");
  const [modal, setModal] = useState();
  const idAddComment = useId();

  function loadComments() {
    axios.get(HOST + "/comment").then((res) => {
      setComments(res.data);
    });
  }
  useEffect(() => {
    loadComments();
  }, []);
  return (
    <div className=" h-full  flex flex-col flex-end items-center bg-bgColor">
      <div className="lg:w-1/2 comments-list flex flex-col gap-5 items-end  px-4 py-6">
        {/* Comments */}
        {comments
          ? comments.map((parentComment) => (
              <div className="flex flex-col gap-5 w-full ">
                <Comment
                  key={parentComment._id}
                  parentId={parentComment._id}
                  setComments={setComments}
                  commentData={parentComment}
                  loadComment={loadComments}
                  replyTo={replyTo}
                  setReplyTo={setReplyTo}
                  setModal={setModal}
                ></Comment>
                {/* Sub comments of the comment */}
                <div className="sub-comments flex flex-col items-end gap-5 border-line border-l-2">
                  {parentComment.replies
                    ? parentComment.replies.map((child) => (
                        <div className="flex flex-col gap-5 w-11/12">
                          <Comment
                            key={child._id}
                            isChild={true}
                            setComments={setComments}
                            parentName={parentComment.user.username}
                            parentId={parentComment._id}
                            childId={child._id}
                            commentData={child}
                            loadComment={loadComments}
                            replyTo={replyTo}
                            setReplyTo={setReplyTo}
                            setModal={setModal}
                          ></Comment>
                          
                        </div>
                      ))
                    : null}
                </div>
              </div>
            ))
          : null}

        <AddComment
          key={idAddComment}
          loadComment={loadComments}
        ></AddComment>
      </div>
      <Modal modal={modal} loadComment={loadComments}></Modal>
    </div>
  );
}

export default Home;
