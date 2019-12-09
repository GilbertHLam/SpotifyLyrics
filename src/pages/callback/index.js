import React, { useEffect, useState } from "react";
import "./styles.css";
import { callback } from "../../utils/apiCalls";
import { Redirect } from "react-router-dom";
import { useStateValue } from "../../state";

const Callback = props => {
  const { dispatch } = useStateValue();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    callback(props.location.search.split("?code=")[1].split("&state=")[0])
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log(response);
        dispatch({
          type: "setTokens",
          credentials: {
            accessToken: response.accessToken,
            refreshToken: response.refreshToken
          }
        });
        setIsLoading(false);
      });
  }, []);

  const generateLoadingBars = () => {
    const array = [];
    for (let i = 0; i < 30; i++) {
      array.push(
        <div
          key={i}
          className="loading"
          style={{ animationDelay: `${(i - 18) * 0.1}s` }}
        ></div>
      );
    }
    return array;
  };
  return (
    <div className="callback">
      {isLoading ? (
        <>
          <div className="loadingSection">{generateLoadingBars()}</div>
          <h2 className="message">Logging you in....</h2>
        </>
      ) : (
        <Redirect
          to={{
            pathname: "/lyrics"
          }}
        />
      )}
    </div>
  );
};

export default Callback;
