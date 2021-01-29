import React from "react";
import ReactDOM from "react-dom";

import "./Backdrop.css";

const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <div
      className="backdrop"
      style={{ zIndex: props.index }}
      onClick={props.onClick}
    >
      {props.index}
    </div>,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;
