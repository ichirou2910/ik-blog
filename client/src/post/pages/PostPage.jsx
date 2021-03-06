import React, { useState, useEffect, useContext, useCallback } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import PostPreview from "../components/PostPreview";
import Tags from "../components/Tags";
import StickyIcon from "../../shared/components/UIElements/StickyIcon";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import NoPage from "../../shared/pages/NoPage";

import "./PostPage.css";

const PostPage = () => {
  const [post, setPost] = useState();

  const { isLoading, error, sendRequest } = useHttpClient();

  const auth = useContext(AuthContext);
  const slug = useParams().slug;

  const getAuth = useCallback(() => {
    if (auth.token) {
      return {
        Authorization: "Bearer " + auth.token,
      };
    }
    return {};
  }, [auth.token]);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const blogData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/post/${slug}`,
          "GET",
          null,
          getAuth()
        );
        setPost(blogData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchInfo();
  }, [sendRequest, getAuth, slug]);

  return (
    <>
      {!isLoading && post && (
        <Helmet>
          <title>{`${post.draft ? "(Draft)" : ""} ${
            post.title
          } - IK's Blog`}</title>
          <meta name="og:title" content={`${post.title} - IK's Blog`} />
          <meta
            name="og:image"
            content={`${process.env.REACT_APP_API_URL}/${post.cover}`}
          />
        </Helmet>
      )}
      <div className="post-page">
        {isLoading && <LoadingSpinner asOverlay />}
        {error && <NoPage error={error} />}
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
                  {!post.preview && <Tags tags={post.tags} />}
                  {post.draft ? (
                    <h3>
                      <strong>(Draft Preview)</strong>
                    </h3>
                  ) : (
                    <>
                      <p>Created: {post.createdDate}</p>
                      <p>Last modified: {post.modifiedDate}</p>
                    </>
                  )}
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
