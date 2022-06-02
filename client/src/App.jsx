import React, { useState, useEffect, createContext } from "react";
import Card from "./Components/Comment";

function App() {

  return (
    <div className=" h-screen flex flex-col flex-end items-center   bg-blue-200">
      <div className="w-10/12">
        <UserContext.Provider value={comments}>
          <Card userIndex={0}></Card>
          <Card userIndex={1}></Card>
        </UserContext.Provider>
      </div>
    </div>
  );
}

export default App;
