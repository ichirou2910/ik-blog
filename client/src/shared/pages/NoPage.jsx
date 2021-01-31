import React from "react";

import "./NoPage.css";

const NoPage = ({ error }) => {
  return (
    <div className="no-page">
      <h2>404</h2>
      <h4>The page you are looking for doesn't exist</h4>
      <p>Error: {error}</p>
    </div>
  );
};

export default NoPage;
