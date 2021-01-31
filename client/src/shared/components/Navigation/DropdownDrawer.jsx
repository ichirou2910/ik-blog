import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { ThemeContext } from "../../context/theme-context";

import "./DropdownDrawer.css";

const DropdownDrawer = (props) => {
  const { theme } = useContext(ThemeContext);

  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-top"
      mountOnEnter
      unmountOnExit
    >
      <aside className={`dropdown-drawer ${theme}`}>{props.children}</aside>
    </CSSTransition>
  );
  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};

export default DropdownDrawer;
