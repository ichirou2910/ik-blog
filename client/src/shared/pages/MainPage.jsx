import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import Bloggit from "../../shared/components/UIElements/Bloggit";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import "./MainPage.css";
import PostList from "../../post/components/PostList";

const MainPage = () => {
  const [postList, setPostList] = useState();

  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const blogData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/post`
        );
        setPostList(blogData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchInfo();
  }, [sendRequest]);

  return (
    <>
      <Helmet>
        <title>{"IK's Blog - Main Page"}</title>
      </Helmet>
      <div className="main-page">
        {isLoading && <LoadingSpinner asOverlay />}
        {error && <p>{error}</p>}
        {auth.isLoggedIn && <Bloggit />}
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
