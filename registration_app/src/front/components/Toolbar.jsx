import React from "react";
import "../styles/toolbar.css";
import blockUser from "../../icons/block.png";
import unblockUser from "../../icons/unblock.png";
import removeUser from "../../icons/remove.png";

export default function Toolbar() {
  return (
    <div className="toolbar">
      <button
        className="block-user"
        onClick={() => {
          console.log("good");
        }}
      >
        <img className="icon" src={blockUser} alt="blocked" />
      </button>
      <button className="unblock-user">
        <img className="icon" src={unblockUser} alt="unblock" />
      </button>
      <button className="delete-user">
        <img className="icon" src={removeUser} alt="delete" />
      </button>
    </div>
  );
}
