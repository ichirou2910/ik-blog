import React from "react";

import Tags from "../components/Tags";
import Card from "../../shared/components/UIElements/Card";

import "./Post.css";

const Post = (props) => {
  return (
    <article className={`${!props.preview && "post"}`}>
      <Card className="post__card card--lighter">
        {!props.preview && (
          <a className="post__image" href={`/post/${props.slug}`}>
            <img
              src={`${process.env.REACT_APP_HOST_URL}/${props.cover}`}
              alt={props.title}
            />
          </a>
        )}
        <div className="post__info">
          {!props.preview && <Tags tags={props.tags} />}
          <h2 className="post__title">
            <a href={`/post/${props.slug}`}>{props.title}</a>
          </h2>
          <p className="post__date">
            {props.date.substr(0, props.date.indexOf(","))}
          </p>
        </div>
      </Card>
    </article>
  );
};

export default Post;
