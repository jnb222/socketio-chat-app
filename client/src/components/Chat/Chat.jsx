import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import io from "socket.io-client";

import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";

let socket;

import "./Chat.css";

function Chat() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const ENDPOINT = "localhost:5000";

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = (event) => {
    console.log("Enter is pressed");
    event.preventDefault();
    if (message) {
      socket.emit("send_message", message, () => setMessage(""));
    }
  };

  // Use Effect For Handling Join
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setName(name);
    setRoom(room);
    socket = io(ENDPOINT);
    socket.emit("join_room", { name, room }, (error) => {
      if (error) {
        alert(error);
        return navigate("/");
      }
    });
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  // Use Effect For Sending Message
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    socket.on("room_users", ({ roomUsers }) => {
      // console.log(roomUsers);
      setUsers(roomUsers);
    });
  });

  console.log(message, messages, users);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar roomName={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          sendMessage={sendMessage}
          handleMessageChange={handleMessageChange}
        />
      </div>
      <TextContainer users={users} currName={name} />
    </div>
  );
}

export default Chat;
