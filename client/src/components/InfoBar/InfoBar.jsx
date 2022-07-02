import React from "react";
import { useNavigate } from "react-router-dom";

import Join from "../Join/Join";

import closeIcon from "../../icons/closeIcon.png";
import onlineIcon from "../../icons/onlineIcon.png";

import "./InfoBar.css";

function InfoBar({ roomName }) {
  const navigate = useNavigate();

  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img src={onlineIcon} className="onlineIcon" alt="online image" />
        <h3>{`Room: ${roomName}`}</h3>
      </div>
      <div className="rightInnerContainer">
        <a onClick={() => navigate("/")}>
          <img src={closeIcon} alt="close image" />
        </a>
      </div>
    </div>
  );
}

export default InfoBar;
