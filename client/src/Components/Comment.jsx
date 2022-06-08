import React, {
  useState,
  useId,
} from "react";
import CommentContent from "./CommentContent";
import UpdateComment from "./UpdateComment";
import AddComment from "./AddComment";
function Comment({
  isChild,
  childId,
  commentData,
  parentId,
  loadComment,
  setReplyTo,
  replyTo,
  setComments,
  commentInput,
  setModal,
}) {
  const [editStatus, setEditStatus] = useState(false);
  const [isReply, setIsReply] = useState(false);

  const idAddComment = useId();
  return (
    <>
      <section className="comment bg-white p-4 rounded-xl drop-shadow-lg flex flex-col gap-3 ">
        <div className="flex items-center gap-3">
          <img
            src={`src/public/${commentData.user.image.png}`}
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
            setReplyTo={setReplyTo}
            loadComment={loadComment}
            commentData={commentData}
            isChild={isChild}
            childId={childId}
            parentId={parentId}
            editStatus={editStatus}
            setEditStatus={setEditStatus}
            setModal={setModal}
            setIsReply={setIsReply}
            isReply={isReply}
          />
        )}
      </section>
      {isReply ? (
        <AddComment
          key={idAddComment}
          isReply={isReply}
          setIsReply={setIsReply}
          loadComment={loadComment}
          replyTo={replyTo}
          setReplyTo={setReplyTo}

        ></AddComment>
      ) : null}
    </>
  );
}

export default Comment;
