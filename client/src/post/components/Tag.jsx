import React from "react";

const Tag = ({ tag }) => {
  return (
    <span style={{ marginRight: "0.5rem" }}>
      <a href={`/search/tag/${tag}`}>#{tag}</a>
    </span>
  );
};

export default Tag;
