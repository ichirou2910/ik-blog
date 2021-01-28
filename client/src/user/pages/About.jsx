import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import Avatar from "../../shared/components/UIElements/Avatar";
import Cover from "../../shared/components/UIElements/Cover";
import StickyIcon from "../../shared/components/UIElements/StickyIcon";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import "./About.css";

const marked = require("marked");
marked.setOptions({
  breaks: true,
});

const renderer = new marked.Renderer();

const renderMarkdown = (text) => {
  return {
    __html: marked(text, {
      renderer: renderer,
    }),
  };
};

const avatarStyle = {
  margin: "0 auto",
  marginBottom: "-4rem",
  transform: "translateY(-50%)",
  border: ".35rem solid var(--primary-bg-color)",
  backgroundColor: "var(--primary-bg-color)",
  zIndex: 10,
};

const content = `
# About me
### Introduction
Mình là sinh viên trường Đại học Công nghệ - Đại học Quốc gia Hà Nội ngành công nghệ thông tin.

Mình thích game dev. Tuy nhiên mình dev cả web và app.

Những ngôn ngữ, công nghệ mình sử dụng:
- Web Frontend: HTML, CSS, JS, React (JS)
- Web Backend: Django (Python), Express (JS)
- Database: MySQL, SQLite, MongoDB
- Game: SDL (C/C++), SFML (C++), Unity (C#), GameMaker (GML)

Ngoài những thứ trên hiện mình đang tìm hiểu thêm về:
- Mobile: Flutter (Dart)
- Web Backend: .NET Core (C#), Firebase (JS)
- System: C

Những công cụ mình đang dùng để code:
- Web browser: Brave
- Text editor: Neovim, VSCode
- IDE: ~~Neovim~~
- OS: ~~I use Arch Linux btw~~ (j4f)

Ngôn ngữ yêu thích của mình là C 🐧

### Facts about me

- Mình có học vẽ, nhưng mắc bệnh lười nên chậm tiến bộ quá huhu
- Mình thích nghe Jpop, nhóm yêu thích của mình là EXILE TRIBE, cá nhân yêu thích thì là Eve

### Contact me
<img height="24" width="24" src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/facebook.svg" /> [Keita Ichirou](https://www.facebook.com/profile.php?id=100013729424213)

<img height="24" width="24" src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/github.svg" /> [ichirou2910](https://github.com/ichirou2910)

`;

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
        <div
          className="about__content base-view"
          dangerouslySetInnerHTML={renderMarkdown(content)}
        ></div>
      </div>
    </>
  );
};

export default About;
