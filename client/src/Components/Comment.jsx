import React , { useState, useEffect, createContext }from "react";
import CardContent from "./ChildComment";
import axios from "axios";

function Card({ userIndex, isChild }) {
  const [comments, setComments] = useState("");
  useEffect(() => {
    axios.get("../src/asserts/data.json").then((res) => {
      setComments(res.data.comments[userIndex]);
    });
  }, []);

  return comments ? (
    isChild ? (
      <section className="p-4 flex flex-col gap-2 bg-white ">
        <CardContent />
      </section>
    ) : (
      <section className="p-4 flex flex-col gap-2 bg-white">
        <CardContent />
      </section>
    )
  ) : null;
}

export default Card;
