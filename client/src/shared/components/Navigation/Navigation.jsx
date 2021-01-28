import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import "./Navigation.css";

const Navigation = () => {
  const auth = useContext(AuthContext);

  return (
    <div className="navigation">
      <Link to="/about">
        <p>ABOUT</p>
      </Link>
      <a
        href="https://github.com/ichirou2910"
        target="_blank"
        rel="noopener noreferrer"
      >
        <p>GITHUB</p>
      </a>
      {auth.isLoggedIn && (
        <p className="text-danger" onClick={auth.logout}>
          LOGOUT
        </p>
      )}
    </div>
  );
};

export default Navigation;
