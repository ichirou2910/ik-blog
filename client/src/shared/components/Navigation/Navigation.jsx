import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import Button from "../FormElements/Button";

import "./Navigation.css";

const Navigation = () => {
  const auth = useContext(AuthContext);

  return (
    <div className="navigation">
      <Link to="/about">
        <p>ABOUT</p>
      </Link>
      <Link to="/about">
        <p>CONTACT</p>
      </Link>
      {auth.isLoggedIn && (
        <p className="text-danger" onClick={auth.logout}>
          LOGOUT
        </p>
      )}
    </div>
  );
};

export default Navigation;
