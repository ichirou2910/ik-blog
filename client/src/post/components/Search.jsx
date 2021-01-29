import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useHttpClient } from "../../shared/hooks/http-hook";

import PostList from "../../post/components/PostList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import "./Search.css";

const Search = ({ initialQuery }) => {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState(initialQuery || "");
  const [isTouched, setIsTouched] = useState(false);

  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    const initialFetch = async () => {
      try {
        if (initialQuery) {
          const postData = await sendRequest(
            `${
              process.env.REACT_APP_API_URL
            }/post/search?q=${initialQuery.replace("#", "%23")}`
          );
          setPosts(postData);
        }
      } catch (err) {
        console.log(err);
      }
    };
    initialFetch();
  }, [sendRequest, initialQuery]);

  useEffect(() => {
    const typingTimeout = setTimeout(async () => {
      if (isTouched) {
        console.log("Touched fetch");
        try {
          const postData = await sendRequest(
            `${process.env.REACT_APP_API_URL}/post/search?q=${query}`
          );
          setPosts(postData);
        } catch (err) {
          console.log(err);
        }
      }
    }, 1000);
    return () => clearTimeout(typingTimeout);
  }, [sendRequest, isTouched, query]);

  const queryInputHandler = (e) => {
    setQuery(e.target.value);
    if (!isTouched) setIsTouched(true);
  };

  return (
    <div className="search">
      <Helmet>
        <title>{`Search - IK's Blog`}</title>
      </Helmet>
      <input
        className="search__input"
        type="text"
        id="query"
        value={query}
        onChange={queryInputHandler}
      />
      {isLoading && <LoadingSpinner />}
      {!isLoading && <PostList preview posts={posts} />}
    </div>
  );
};

export default Search;
