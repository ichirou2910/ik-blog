import React, { useState } from "react";

import Modal from "../../shared/components/UIElements/Modal";
import Search from "./Search";

import "./Tags.css";

const searchModalStyle = {
  height: "calc(100% - 10rem)",
  top: "5rem",
};

const tagStyle = {
  marginRight: "0.5rem",
  cursor: "pointer",
};

const Tag = ({ tag, toggle }) => {
  return (
    <span style={tagStyle} onClick={toggle}>
      #{tag}
    </span>
  );
};

const Tags = ({ tags }) => {
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
        {tags.length === 1 && tags[0] === "" ? (
          <span style={tagStyle}>(untagged)</span>
        ) : (
          <>
            {tags.map((item, index) => (
              <Tag
                key={index}
                tag={item}
                toggle={() => {
                  setSelectedTag(`#${item}`);
                  setShowSearch(true);
                }}
              />
            ))}
          </>
        )}
      </p>
    </>
  );
};

export default Tags;
