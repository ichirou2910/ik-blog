import React from "react";

import { Tabs, TabItem } from "../UIElements/Tab";
import Input from "./Input";
import PostPreview from "../../../post/components/PostPreview";

import "./Editor.css";
import "../../../post/pages/BlogForm.css";

const blogPreviewStyle = {
  width: "100%",
  border: "2px solid var(--accent-color)",
  margin: 0,
};

const previewContentStyle = {
  height: "70vh",
  border: "2px solid var(--accent-color)",
  borderRadius: 0,
  overflowY: "scroll",
};

const Editor = (props) => {
  return (
    <>
      <Tabs defaultIndex="1">
        <TabItem label="Content" index="1">
          <Input
            id={props.id}
            element="textarea"
            validators={props.validators}
            errorText={props.errorText}
            onInput={props.onInput}
            initialValue={props.editValue}
            initialValid={props.editValid}
          />
        </TabItem>
        <TabItem label="Preview" index="2">
          <PostPreview
            text={props.previewValue}
            blogPreviewStyle={blogPreviewStyle}
            previewContentStyle={previewContentStyle}
          />
        </TabItem>
      </Tabs>
    </>
  );
};

export default Editor;
