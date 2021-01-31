import React, { useState, useEffect, useContext, useCallback } from "react";
import { Helmet } from "react-helmet";
import { Redirect, useParams } from "react-router-dom";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Editor from "../../shared/components/FormElements/Editor";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import "./BlogForm.css";

const EditPost = () => {
  const [post, setPost] = useState();
  const [isDraft, setIsDraft] = useState(false);
  const [edited, setEdited] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest } = useHttpClient();

  const slug = useParams().slug;

  const getAuth = useCallback(() => {
    if (auth.token) {
      return {
        Authorization: "Bearer " + auth.token,
      };
    }
    return {};
  }, [auth.token]);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      content: {
        value: "",
        isValid: false,
      },
      tags: {
        value: "",
        isValid: false,
      },
      cover: {
        value: null,
        isValid: true,
      },
    },
    false
  );

  useEffect(() => {
    setFormData(
      {
        title: {
          value: post ? post.title : "",
          isValid: post && post.title,
        },
        content: {
          value: post ? post.content : "",
          isValid: post && post.content,
        },
        tags: {
          value: post ? post.tags.join(" ") : "",
          isValid: post && post.tags,
        },
      },
      post && post.title && post.content && post.tags
    );
  }, [setFormData, post]);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const postData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/post/${slug}`,
          "GET",
          null,
          getAuth()
        );
        setPost(postData);
        setIsDraft(postData.draft);
      } catch (err) {
        console.log(err);
      }
    };
    fetchInfo();
  }, [sendRequest, slug]);

  const submitHandler = (event) => {
    event.preventDefault();

    let now = new Date();
    let _date = now.toISOString();
    let _display = now.toLocaleString("en-us", {
      timeZone: "Asia/Ho_Chi_Minh",
    });

    try {
      let empty = true; // Whether there is change in form value

      const formData = new FormData();
      if (isDraft === false) {
        formData.append("draft", isDraft);
        empty = false;
      }
      if (formState.inputs.title.value !== post.title) {
        formData.append("title", formState.inputs.title.value);
        empty = false;
      }
      if (formState.inputs.content.value !== post.content) {
        formData.append("content", formState.inputs.content.value);
        empty = false;
      }
      if (formState.inputs.tags.value !== post.tags) {
        formData.append("tags", formState.inputs.tags.value);
        empty = false;
      }
      if (formState.inputs.cover) {
        empty = false;
        formData.append("cover", formState.inputs.cover.value);
      }

      formData.append("date", _date);
      formData.append("displayDate", _display);

      if (!empty) {
        // Only send edit request if any field changed
        sendRequest(
          `${process.env.REACT_APP_API_URL}/post/${slug}`,
          "POST",
          formData,
          {
            Authorization: "Bearer " + auth.token,
          }
        ).then(() => setEdited(true));
      } else {
        setEdited(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBlogHandler = async (event) => {
    event.preventDefault();

    try {
      sendRequest(
        `${process.env.REACT_APP_API_URL}/post/${slug}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      ).then(() => setDeleted(true));
    } catch (err) {
      console.log(err);
    }
  };

  if (!post) {
    return (
      <div style={{ marginTop: "4rem" }}>
        <h2>Blog not found</h2>
      </div>
    );
  }

  if (edited) {
    return <Redirect to={`/post/${slug}`} />;
  }

  if (deleted) {
    return <Redirect to={"/"} />;
  }

  return (
    <>
      {post && (
        <Helmet>
          <title>{`(Edit) ${post.title} - IK's Blog`}</title>
        </Helmet>
      )}
      <form className="blog-form base-view" onSubmit={submitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        {error && <p>{error}</p>}
        {!isLoading && post && (
          <>
            <div className="blog-form__title">
              <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                initialValue={post.title}
                initialValid={true}
              />
            </div>
            <Editor
              id="content"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
              onInput={inputHandler}
              editValue={post.content}
              editValid={true}
              previewValue={formState.inputs.content.value}
            />
            <br />
            <Input
              id="tags"
              element="input"
              type="text"
              label="Tags"
              validators={[]}
              onInput={inputHandler}
              initialValue={post.tags.join(" ")}
              initialValid={true}
            />
            <ImageUpload
              id="cover"
              onInput={inputHandler}
              description="CHANGE COVER"
              initialValue={`${process.env.REACT_APP_HOST_URL}/${post.cover}`}
              initialValid={true}
            />
            <div className="blog-form__submit">
              {post.draft && (
                <Button
                  type="submit"
                  onClick={() => setIsDraft(false)}
                  disabled={!formState.isValid}
                >
                  PUBLISH
                </Button>
              )}
              <Button type="submit">SAVE</Button>
              <Button danger onClick={deleteBlogHandler}>
                DELETE
              </Button>
            </div>
          </>
        )}
      </form>
    </>
  );
};

export default EditPost;
