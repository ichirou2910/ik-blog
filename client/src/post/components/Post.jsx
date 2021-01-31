import React from "react";

import Tags from "../components/Tags";
import Card from "../../shared/components/UIElements/Card";

import "./Post.css";

const Post = ({ post }) => {
  return (
    <article className={`${!post.preview ? "post" : "post--preview"}`}>
      {post.draft && (
        <>
          <div className="post__draft">
            <span>Draft</span>
          </div>
        </>
      )}
      <Card className="post__card card--lighter">
        {!post.preview && (
          <a className="post__image" href={`/post/${post.slug}`}>
            <img
              src={`${process.env.REACT_APP_HOST_URL}/${post.cover}`}
              alt={post.title}
            />
          </a>
        )}
        <div className="post__info">
          {!post.preview && <Tags tags={post.tags} />}
          <h2 className="post__title">
            <a href={`/post/${post.slug}`}>{post.title}</a>
          </h2>
          <p className="post__date">
            {post.date.substr(0, post.date.indexOf(","))}
          </p>
        </div>
      </Card>
    </article>
  );
};

export default Post;
