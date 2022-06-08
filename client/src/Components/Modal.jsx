import React from "react";
import axios from "axios";
const HOST = import.meta.env.VITE_URL;

function Modal({modal,loadComment}) {
  const handleDeleteButton = ({isChild, childId, parentId}) => {
    console.log(isChild)
    isChild ? deleteReply(childId, parentId) : deleteComment(parentId);
  };
  const deleteComment = (id) => {
    axios.delete(`${HOST}/comment/${id}`).then((res) => {
      loadComment();
    });
  };
  const deleteReply = (childId, parentId) => {
    const reply = {
      parent: parentId,
      child: childId,
    };
    axios.post(`${HOST}/comment/reply/delete`, reply).then((res) => {
      loadComment();
    });
  };
  return (
    // <!-- Put this part before </body> tag -->
    <div>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Delete Comment
          </h3>
          <p className="py-4">
            Are you sure you want to delete this comment? This will remove the comment and can't be undone.
          </p>
          <div className="modal-action">
          <label for="my-modal" className="btn" >
              No,Cancel
            </label>
            <label for="my-modal" className="btn btn-warning" onClick={(x) => handleDeleteButton(modal)}>
              Yes,DELETE
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
