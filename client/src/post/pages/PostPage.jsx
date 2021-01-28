import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import PostPreview from "../components/PostPreview";
import StickyIcon from "../../shared/components/UIElements/StickyIcon";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import "./PostPage.css";

const PostPage = () => {
  const [post, setPost] = useState();

  const { isLoading, error, sendRequest } = useHttpClient();

  const auth = useContext(AuthContext);
  const slug = useParams().slug;

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const blogData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/post/${slug}`
        );
        setPost(blogData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchInfo();
  }, [sendRequest, slug]);

  return (
    <>
      {!isLoading && post && (
        <Helmet>
          <title>{`${post.title} - IK's Blog`}</title>
        </Helmet>
      )}
      <div className="post-page">
        {isLoading && <LoadingSpinner asOverlay />}
        {error && <p>{error}</p>}
        {!isLoading && auth.isLoggedIn && post && (
          <StickyIcon
            src={`${process.env.REACT_APP_HOST_URL}/uploads/images/edit-post.png`}
            alt="edit profile icon"
            to={`/post/${slug}/edit`}
            text="Edit Blog"
          />
        )}
        {!isLoading && post && (
          <>
            <article className="base-view">
              <header className="post-page__header">
                <section className="post-page__meta">
                  {/* <p className="post-page__tags"> */}
                  {/*   <span>#vim</span> */}
                  {/*   <span>#vscode</span> */}
                  {/* </p> */}
                  <p>Last modified: {post.displayDate}</p>
                </section>
                <h2>{post.title}</h2>
              </header>
              <figure className="post-page__image">
                <img
                  src={`${process.env.REACT_APP_HOST_URL}/${post.cover}`}
                  alt="Cover"
                />
              </figure>
              <section className="post-page__content">
                <PostPreview text={post.content} />
              </section>
            </article>
          </>
        )}
      </div>
    </>
  );
};

export default PostPage;
