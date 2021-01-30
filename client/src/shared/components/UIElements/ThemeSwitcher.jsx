import React, { useContext } from "react";
import { ThemeContext } from "../../context/theme-context";

import { ReactComponent as ThemeIcon } from "../../../icons/light-dark.svg";

import "./ThemeSwitcher.css";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    console.log("Theme switched");
    if (theme === "dark") setTheme("light");
    if (theme === "light") setTheme("dark");
  };

  return (
    <div className="theme-switcher">
      <a className="theme-switcher__icon" onClick={toggleTheme}>
        <ThemeIcon />
      </a>
    </div>
  );
};

export default ThemeSwitcher;
