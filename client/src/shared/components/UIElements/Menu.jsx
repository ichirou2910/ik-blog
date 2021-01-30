import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/theme-context";
import { AuthContext } from "../../context/auth-context";

import { ReactComponent as ThemeIcon } from "../../../icons/light-dark.svg";
import { ReactComponent as PlusIcon } from "../../../icons/plus.svg";

import "./Menu.css";

const Menu = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const auth = useContext(AuthContext);

  const toggleTheme = () => {
    if (theme === "dark") setTheme("light");
    if (theme === "light") setTheme("dark");
  };

  return (
    <>
      <div className={`menu-icon ${theme}`}>
        <div className="menu-icon__icon" onClick={toggleTheme}>
          <ThemeIcon />
        </div>
      </div>
      {auth.isLoggedIn && (
        <Link to="/create">
          <div style={{ bottom: "120px" }} className={`menu-icon ${theme}`}>
            <div className="menu-icon__icon">
              <PlusIcon />
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default Menu;
