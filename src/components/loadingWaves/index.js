import React from "react";
import "./styles.css";

const LoadingWaves = props => {
  const generateLoadingBars = () => {
    const array = [];
    for (let i = 0; i < 30; i++) {
      array.push(
        <div
          key={i}
          className="loadingBar"
          style={{ animationDelay: `${(i - 18) * 0.1}s` }}
        ></div>
      );
    }
    return array;
  };
  return (
    <>
      <div className="loadingSection">{generateLoadingBars()}</div>
      <h2 className="message">{props.message}</h2>
    </>
  );
};

export default LoadingWaves;
