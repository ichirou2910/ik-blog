import React, { useState, useEffect, useContext, useCallback } from "react";
import { Helmet } from "react-helmet";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import PostList from "../../post/components/PostList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import "./Search.css";

const Search = ({ initialQuery }) => {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState(initialQuery || "");
  const [isTouched, setIsTouched] = useState(false);

  const auth = useContext(AuthContext);

  const { isLoading, sendRequest } = useHttpClient();

  const getAuth = useCallback(() => {
    if (auth.token) {
      return {
        Authorization: "Bearer " + auth.token,
      };
    }
    return {};
  }, [auth.token]);

  useEffect(() => {
    const initialFetch = async () => {
      try {
        if (initialQuery) {
          const postData = await sendRequest(
            `${process.env.REACT_APP_API_URL}/post?q=${initialQuery.replace(
              "#",
              "%23"
            )}`,
            "GET",
            null,
            getAuth()
          );
          setPosts(postData);
        }
      } catch (err) {
        console.log(err);
      }
    };
    initialFetch();
  }, [sendRequest, getAuth, initialQuery]);

  useEffect(() => {
    const typingTimeout = setTimeout(async () => {
      if (isTouched) {
        console.log("Touched fetch");
        try {
          const postData = await sendRequest(
            `${process.env.REACT_APP_API_URL}/post?q=${query}`,
            "GET",
            null,
            getAuth()
          );
          setPosts(postData);
        } catch (err) {
          console.log(err);
        }
      }
    }, 1000);
    return () => clearTimeout(typingTimeout);
  }, [sendRequest, getAuth, isTouched, query]);

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
      {!isLoading && (
        <div className="search__result">
          <PostList preview posts={posts} />
        </div>
      )}
    </div>
  );
};

export default Search;
