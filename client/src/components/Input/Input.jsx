import React from "react";

import "./Input.css";

function Input({ message, sendMessage, handleMessageChange }) {
  return (
    <form className="form">
      <input
        placeholder="Type message here..."
        value={message}
        onChange={handleMessageChange}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
        type="text"
        className="input"
      />
      <button className="sendButton" onClick={(event) => sendMessage(event)}>
        Send
      </button>
    </form>
  );
}

export default Input;

{
  /* <input
  value={message}
  onChange={handleMessageChange}
  onKeyPress={(event) => (event.key === "Enter" ? sendMessage(event) : null)}
  type="text"
/>; */
}
