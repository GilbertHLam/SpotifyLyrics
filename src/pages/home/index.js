import React, { useState, useEffect } from "react";
import "./styles.css";
import Waves from "../../assets/waves";
import LoginButton from "../../components/loginButton";

const Home = () => {
  const [headerClicked, setHeaderClicked] = useState(false);

  const onHeaderClick = () => {
    setHeaderClicked(!headerClicked);
  };

  useEffect(() => {
    setTimeout(function() {
      onHeaderClick();
    }, 1500);
  }, []);

  return (
    <div className="home">
      <div className="header" onClick={onHeaderClick}>
        <h2
          className={`header__dev ${!headerClicked ? "header__dev--open" : ""}`}
        >
          <b>SPOTIFY</b>
          <b className="thin">LYRICS</b>
        </h2>
      </div>
      <Waves />
      <div className="buttonContainer">
        <LoginButton />
      </div>
    </div>
  );
};

export default Home;
