import React, { useEffect, useState } from "react";
import "./styles.css";
import { callback } from "../../utils/apiCalls";
import { Redirect } from "react-router-dom";
import { useStateValue } from "../../state";
import LoadingWaves from "../../components/loadingWaves";

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
        localStorage.setItem("accessToken", response.accessToken);
        setIsLoading(false);
      });
  }, []);

  
  return (
    <div className="callback">
      {isLoading ? (
        <>
          <LoadingWaves message="Logging you in..."/>
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
