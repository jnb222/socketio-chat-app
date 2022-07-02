import React from "react";

import onlineIcon from "../../icons/onlineIcon.png";

import "./TextContainer.css";

const TextContainer = ({ users, currName }) => (
  <div className="textContainer">
    <div>
      <u>
        <h1>People currently chatting:</h1>
      </u>
      <div className="activeContainer">
        <h2>
          {users.map(({ name }, id) => (
            <div key={name} className="activeItem">
              {`${id + 1}. `}
              {name}
              {name === currName ? (
                ` <-- ( YOU )`
              ) : (
                <img alt="Online Icon" src={onlineIcon} />
              )}
            </div>
          ))}
        </h2>
      </div>
    </div>
  </div>
);

export default TextContainer;
