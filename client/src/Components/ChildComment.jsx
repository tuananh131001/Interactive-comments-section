import React from "react";

function CardContent() {

  return (
    <>
      <div className="flex items-center gap-4">
        <img src={`src/asserts/${comments.user.image.png}`} alt="" />
        <h3 className="font-bold">{comments.user.username}</h3>
        <h3>{comments.createdAt}</h3>
      </div>

      <p>{comments.content}</p>
      <figure className="flex justify-between">
        <div className="vote bg-#a991f7">
          <button className="btn">+</button>
          <button className="btn btn-square">6</button>
          <button className="btn">-</button>
        </div>
        <button className="btn btn-primary">Reply</button>
      </figure>
    </>
  );
}

export default CardContent;
