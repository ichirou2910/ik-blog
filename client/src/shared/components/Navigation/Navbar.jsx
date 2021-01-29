import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import Navigation from "./Navigation";
import DropdownDrawer from "./DropdownDrawer";
import Backdrop from "../UIElements/Backdrop";

import "./Navbar.css";

const Navbar = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <>
      {showDrawer && (
        <Backdrop
          index={31}
          onClick={() => {
            console.log("Menu hidden");
            setShowDrawer(false);
          }}
        />
      )}
      <DropdownDrawer
        show={showDrawer}
        onClick={() => {
          console.log("Drawer clicked");
          setShowDrawer(false);
        }}
      >
        <nav className="navbar__drawer-nav">
          <Navigation />
        </nav>
      </DropdownDrawer>
      <MainHeader>
        <div className="website-name">
          <Link to="/">
            <h3 style={{ marginLeft: "1rem" }}>IK's Blog</h3>
          </Link>
        </div>
        <button
          className="navbar__menu-btn"
          onClick={() => setShowDrawer(true)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className="navbar__header-nav">
          <Navigation />
        </nav>
      </MainHeader>
    </>
  );
};

export default Navbar;
