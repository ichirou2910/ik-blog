import React from "react";
import { Link } from "react-router-dom";

import Tag from "../components/Tag";
import Card from "../../shared/components/UIElements/Card";

import "./Post.css";

const Post = (props) => {
  return (
    <article className="post">
      <Card className="post__card card--lighter">
        <Link className="post__image" to={`/post/${props.slug}`}>
          <img
            src={`${process.env.REACT_APP_HOST_URL}/${props.cover}`}
            alt={props.title}
          />
        </Link>
        <div className="post__info">
          <p className="post__tags">
            {props.tags.map((item, index) => (
              <Tag key={index} tag={item} />
            ))}
          </p>
          <h2 className="post__title">
            <Link to={`/post/${props.slug}`}>{props.title}</Link>
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
