import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

import Navbar from "./shared/components/Navigation/Navbar";
import MainPage from "./shared/pages/MainPage";
import NewPost from "./post/pages/NewPost";
import EditBlog from "./post/pages/EditBlog";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

import "./App.css";

const Auth = React.lazy(() => import("./user/pages/Auth"));
const About = React.lazy(() => import("./user/pages/About"));
const EditAbout = React.lazy(() => import("./user/pages/EditAbout"));
const PostPage = React.lazy(() => import("./post/pages/PostPage"));

const App = () => {
  const { token, login, logout, loginInfo, setInfo } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/about/edit" exact>
          <EditAbout />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/create">
          <NewPost />
        </Route>
        <Route path="/admin">
          <Redirect to="/" />
        </Route>
        <Route path="/post/:slug/edit" exact>
          <EditBlog />
        </Route>
        <Route path="/post/:slug">
          <PostPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/admin" exact>
          <Auth />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
        <Route path="/post/:slug">
          <PostPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        loginInfo: loginInfo,
        login: login,
        logout: logout,
        setInfo: setInfo,
      }}
    >
      <Router>
        <Navbar />
        <main>
          <Suspense
            fallback={
              <div>
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
