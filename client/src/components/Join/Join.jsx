import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Join.css";

function Join() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleRoomChange = (event) => {
    setRoom(event.target.value);
  };
  const handleSignIn = (event) => {
    if (!name || !room) {
      event.preventDefault();
      alert("Please Enter Valid Username And Room");
    }
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={handleNameChange}
          />
        </div>
        <div>
          <input
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            onChange={handleRoomChange}
          />
        </div>
        <Link onClick={handleSignIn} to={`/chat?name=${name}&room=${room}`}>
          <button className="button mt-20" type="submit">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Join;
