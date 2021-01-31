import React, { useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import {
  VALIDATOR_MAXLENGTH,
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

const NewPost = () => {
  const [edited, setEdited] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const { isLoading, error, sendRequest } = useHttpClient();

  const auth = useContext(AuthContext);

  const [formState, inputHandler] = useForm(
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
        isValid: true,
      },
      cover: {
        value: null,
        isValid: true,
      },
    },
    false
  );

  const titleToSlug = (title) => {
    title = title.replace(/^\s+|\s+$/g, ""); // trim
    title = title.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from =
      "àáảãạăằắẳẵặâấầẫẩậäâèéẻẽẹêềếểễệëêìíỉĩịïîòóỏõọôồốổỗộơờớởỡợöôùúủũụưừứửữựüûñç·/_,:;";
    var to =
      "aaaaaaaaaaaaaaaaaaaeeeeeeeeeeeeeiiiiiiiooooooooooooooooooouuuuuuuuuuuuunc------";

    for (var i = 0, l = from.length; i < l; i++) {
      title = title.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    title = title
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes

    return title;
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const now = new Date();
    const _date = now.toISOString();
    const _display = now.toLocaleString("en-us", {
      timeZone: "Asia/Ho_Chi_Minh",
    });
    const slug = titleToSlug(formState.inputs.title.value);

    console.log(isDraft);

    // Create new Blog
    try {
      const formData = new FormData();
      formData.append("draft", isDraft);
      formData.append("user", auth.loginInfo.name);
      formData.append("title", formState.inputs.title.value);
      formData.append("slug", slug);
      formData.append("content", formState.inputs.content.value);
      formData.append("tags", formState.inputs.tags.value);
      formData.append("cover", formState.inputs.cover.value);
      formData.append("date", _date);
      formData.append("displayDate", _display);

      sendRequest(
        `${process.env.REACT_APP_API_URL}/post/create`,
        "POST",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      ).then(() => setEdited(true));
    } catch (err) {
      console.log(err);
    }
  };

  if (edited) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Helmet>
        <title>New Blog - IK's Blog</title>
      </Helmet>
      <form className="blog-form base-view" onSubmit={submitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        {error && <p>{error}</p>}
        <div className="blog-form__title">
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(64)]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
          />
        </div>
        <Editor
          id="content"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter valid content (at least 5 characters)."
          onInput={inputHandler}
          editValue=""
          editValid={false}
          previewValue={formState.inputs["content"].value}
        />
        <br />
        <Input
          id="tags"
          element="input"
          type="text"
          label="Tags"
          validators={[]}
          onInput={inputHandler}
          initialValid={true}
        />
        <ImageUpload
          id="cover"
          description="CHOOSE COVER"
          onInput={inputHandler}
        />
        <div className="blog-form__submit">
          <Button
            type="submit"
            onClick={() => setIsDraft(false)}
            disabled={!formState.isValid}
          >
            CREATE
          </Button>
          <Button type="submit" onClick={() => setIsDraft(true)}>
            SAVE
          </Button>
        </div>
      </form>
    </>
  );
};

export default NewPost;
