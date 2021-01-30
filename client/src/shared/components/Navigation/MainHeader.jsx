import React, { useContext } from "react";
import { ThemeContext } from "../../context/theme-context";

import "./MainHeader.css";

const MainHeader = (props) => {
  const { theme } = useContext(ThemeContext);

  return <header className={`main-header ${theme}`}>{props.children}</header>;
};

export default MainHeader;
