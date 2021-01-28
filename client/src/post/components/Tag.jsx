import React from "react";

const Tag = ({ tag }) => {
  return (
    <span>
      <a href={`/search/tag/${tag}`}>#{tag}</a>
    </span>
  );
};

export default Tag;
