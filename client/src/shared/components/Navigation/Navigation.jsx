import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import Modal from "../UIElements/Modal";
import Search from "../../../post/components/Search";

import "./Navigation.css";

const searchModalStyle = {
  height: "calc(100% - 10rem)",
  top: "5rem",
};

const Navigation = () => {
  const [showSearch, setShowSearch] = useState(false);

  const auth = useContext(AuthContext);

  return (
    <div className="navigation">
      <Modal
        show={showSearch}
        style={searchModalStyle}
        header="Search"
        onCancel={() => {
          console.log("Search Modal closed");
          setShowSearch(false);
        }}
        contentClass="search__modal-content"
        footerClass="search__modal-actions"
      >
        <Search />
      </Modal>
      <p
        style={{ color: "var(--text)", cursor: "pointer" }}
        onClick={() => setShowSearch(true)}
      >
        SEARCH
      </p>
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
