import React, { useState } from "react";

import Modal from "../../shared/components/UIElements/Modal";
import Search from "./Search";

import "./Tags.css";

const searchModalStyle = {
  width: "70%",
  height: "calc(100% - 10rem)",
  left: "15%",
  top: "5rem",
};

const Tag = ({ tag, toggle }) => {
  return (
    <span style={{ marginRight: "0.5rem", cursor: "pointer" }} onClick={toggle}>
      #{tag}
    </span>
  );
};

const Tags = (props) => {
  const [showSearch, setShowSearch] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");

  return (
    <>
      <Modal
        show={showSearch}
        style={searchModalStyle}
        header="Search"
        onCancel={() => setShowSearch(false)}
        contentClass="search__modal-content"
        footerClass="search__modal-actions"
      >
        <Search initialQuery={selectedTag} exit={() => setShowSearch(false)} />
      </Modal>
      <p className="tags">
        {props.tags.map((item, index) => (
          <Tag
            key={index}
            tag={item}
            toggle={() => {
              setSelectedTag(`#${item}`);
              setShowSearch(true);
            }}
          />
        ))}
      </p>
    </>
  );
};

export default Tags;
