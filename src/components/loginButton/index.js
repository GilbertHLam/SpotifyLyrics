import React from "react";
import "./styles.css";
import apiBaseUrl from "../../utils/apiBaseUrl";

const LoginButton = () => {
  return (
    <a className="loginButton" href={apiBaseUrl + "login"}>
      Log In With Spotify
    </a>
  );
};

export default LoginButton;
