import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import Avatar from "../../shared/components/UIElements/Avatar";
import Cover from "../../shared/components/UIElements/Cover";
import StickyIcon from "../../shared/components/UIElements/StickyIcon";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import "./About.css";

const avatarStyle = {
  margin: "0 auto",
  marginBottom: "-4rem",
  transform: "translateY(-50%)",
  border: ".35rem solid var(--primary-bg-color)",
  backgroundColor: "var(--primary-bg-color)",
  zIndex: 10,
};

const About = () => {
  const [info, setInfo] = useState();

  const { isLoading, error, sendRequest } = useHttpClient();

  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const infoData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/user`
        );
        setInfo(infoData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchInfo();
  }, [sendRequest]);

  return (
    <>
      <Helmet>
        <title>About - IK's Blog</title>
      </Helmet>
      <div className="about">
        {isLoading && <LoadingSpinner asOverlay />}
        {error && <p>{error}</p>}
        {!isLoading && auth.isLoggedIn && (
          <StickyIcon
            src={`${process.env.REACT_APP_HOST_URL}/uploads/images/edit-profile.png`}
            alt="edit profile icon"
            to={`/about/edit`}
            text="Edit Profile"
          />
        )}
        {!isLoading && info && (
          <>
            <Cover
              image={`${process.env.REACT_APP_HOST_URL}/${info.cover}`}
              alt="Cover"
            />
            <div className="about__header">
              <Avatar
                large
                image={`${process.env.REACT_APP_HOST_URL}/${info.avatar}`}
                alt="Avatar"
                style={avatarStyle}
              />
              <div className="about__info">
                <h2>ichirou2910</h2>
                <p>{info.description}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default About;
