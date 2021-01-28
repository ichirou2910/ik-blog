import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import Navigation from "./Navigation";
import DropdownDrawer from "./DropdownDrawer";
import Backdrop from "../UIElements/Backdrop";

import "./Navbar.css";

const Navbar = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <DropdownDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
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
        <button className="navbar__menu-btn" onClick={openDrawerHandler}>
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
