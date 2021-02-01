import React from "react";

import Tags from "../components/Tags";
import Card from "../../shared/components/UIElements/Card";

import { FaEye, FaCalendarAlt } from "react-icons/fa";

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
          {!post.preview && (
            <div className="post__tags">
              <Tags tags={post.tags} />
            </div>
          )}
          <h2 className="post__title">
            <a href={`/post/${post.slug}`}>{post.title}</a>
          </h2>
          <p className="post__stat">
            <FaCalendarAlt />{" "}
            {post.createdDate.substr(0, post.createdDate.indexOf(","))}{" "}
            <FaEye /> {post.views}
          </p>
        </div>
      </Card>
    </article>
  );
};

export default Post;
