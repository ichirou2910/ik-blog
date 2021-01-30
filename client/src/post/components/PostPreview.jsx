import React from "react";
import hljs from "highlight.js";

import "./PostPreview.css";
import "highlight.js/styles/atom-one-dark-reasonable.css";

const marked = require("marked");
marked.setOptions({
  breaks: true,
  highlight: (code, lang) => {
    return hljs.highlight(lang, code).value;
  },
});
/*
 */

const renderer = new marked.Renderer();

const renderMarkdown = (text) => {
  return {
    __html: marked(text, {
      renderer: renderer,
    }),
  };
};

const PostPreview = (props) => {
  return (
    <div className="post-preview" style={props.postPreviewStyle}>
      <label
        htmlFor="preview-content"
        style={props.preview ? {} : { display: "none" }}
      >
        Preview
      </label>
      <div
        className="preview-content"
        dangerouslySetInnerHTML={renderMarkdown(props.text)}
        style={props.previewContentStyle}
      ></div>
    </div>
  );
};

export default PostPreview;
