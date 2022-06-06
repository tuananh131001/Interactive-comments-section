import React, { useRef } from "react";

function Login({ setIsLogin, storeUser }) {
  const inputRef = useRef();
  return (
    <>
      <div className=" grid place-content-center h-screen gap-5">
        {" "}
        <label class="input-group">
          <span>Name</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Type your name"
            class="input input-bordered"
          />
        </label>
        <button className="btn" onClick={(x) => storeUser(inputRef.value)}>
          Login
        </button>
      </div>
    </>
  );
}

export default Login;
