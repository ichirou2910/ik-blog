import React, { useState, useEffect } from "react";

import Post from "./Post";
import Button from "../../shared/components/FormElements/Button";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./PostList.css";

const itemsPerPage = 5;

const PostList = (props) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (props.posts) {
      setPosts(
        props.posts.slice(
          page * itemsPerPage,
          Math.min(props.posts.length, page * itemsPerPage + itemsPerPage)
        )
      );
    }
  }, [props.posts, page]);

  const pageInc = () => {
    if (page < props.posts.length / itemsPerPage - 1)
      setPage((page) => page + 1);
  };

  const pageDec = () => {
    if (page > 0) setPage((page) => page - 1);
  };

  return (
    <div className={`post-list ${props.preview ? "post-list--preview" : ""}`}>
      {!props.posts || props.posts.length === 0 ? (
        <p className="post-list__empty">Empty</p>
      ) : (
        <>
          {props.preview
            ? posts.map((post, index) => (
                <Post
                  preview
                  key={index}
                  user={post.user}
                  title={post.title}
                  slug={post.slug}
                  cover={post.cover}
                  tags={post.tags}
                  content={post.content}
                  date={post.displayDate}
                />
              ))
            : posts.map((post, index) => (
                <Post
                  key={index}
                  user={post.user}
                  title={post.title}
                  slug={post.slug}
                  cover={post.cover}
                  tags={post.tags}
                  content={post.content}
                  date={post.displayDate}
                />
              ))}
          {props.posts.length > itemsPerPage && (
            <div className="post-list__navi">
              <Button onClick={pageDec}>
                <FaChevronLeft />
              </Button>
              <p>
                Page {page + 1}/{Math.ceil(props.posts.length / itemsPerPage)}
              </p>
              <Button onClick={pageInc}>
                <FaChevronRight />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostList;
