import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import { useHttpClient } from "../hooks/http-hook";
import PostList from "../../post/components/PostList";

import "./SearchPage.css";

const SearchPage = () => {
  const [posts, setPosts] = useState([]);

  const { isLoading, sendRequest } = useHttpClient();

  const tag = useParams().tag;

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const postData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/post/tag/${tag}`
        );
        setPosts(postData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchInfo();
  }, [sendRequest, tag]);

  return (
    <>
      <Helmet>
        <title>{`Tag: #${tag} - IK's Blog`}</title>
      </Helmet>
      {!isLoading && posts && <PostList posts={posts} />}
    </>
  );
};

export default SearchPage;
