import React, { useState, useEffect, createContext } from "react";
import { FaReply } from "react-icons/fa";

function Comment({ commentData }) {
  return (
    <>
      <section className="comment bg-white p-4 rounded-xl drop-shadow-lg flex flex-col gap-3 ">
        {" "}
        <div className="flex items-center gap-4">
          <img
            src={`src/asserts/${commentData.user.image.png}`}
            alt=""
            className=" w-8"
          />
          <h3 className="font-bold">{commentData.user.username}</h3>
          <h3 className="text-paragraph">{commentData.createdAt}</h3>
        </div>
        <p className="text-paragraph">
          {commentData.replyingTo ? (
            <span className=" text-mention font-bold">
              @{commentData.replyingTo}
            </span>
          ) : null}{" "}
          {commentData.content}
        </p>
        <figure className="flex justify-between items-center">
          <div className="vote bg-bgColor flex justify-center items-center p-2 gap-5 rounded-md">
            <button className=" text-upDown">+</button>
            <button className="text-upDown font-bold">
              {commentData.score}
            </button>
            <button className="text-upDown">-</button>
          </div>
          <div className="reply flex gap-2 items-center">
            {" "}
            <FaReply />
            <button className="text-upDown font-bold">Reply</button>
          </div>
        </figure>
      </section>
    </>
  );
}

export default Comment;
