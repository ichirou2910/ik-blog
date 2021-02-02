import React, { useState, useEffect, useContext, useCallback } from "react";
import { Helmet } from "react-helmet";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../context/auth-context";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import "./MainPage.css";
import PostList from "../../post/components/PostList";

const MainPage = () => {
  const [postList, setPostList] = useState();

  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest } = useHttpClient();

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
        const postData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/post/`,
          "GET",
          null,
          getAuth()
        );
        setPostList(postData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchInfo();
  }, [sendRequest, getAuth]);

  return (
    <>
      <Helmet>
        <title>IK's Blog - Main Page</title>
        <meta name="og:title" content="Main Page - IK's Blog" />
        <meta
          name="og:image"
          content={`${process.env.REACT_APP_API_URL}/uploads/images/ik-blog.png`}
        />
      </Helmet>
      <div className="main-page">
        {isLoading && <LoadingSpinner asOverlay />}
        {error && <p>{error}</p>}
        {!isLoading && (
          <>
            <PostList posts={postList} />
          </>
        )}
      </div>
    </>
  );
};

export default MainPage;
