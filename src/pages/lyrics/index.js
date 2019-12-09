import React, { useState, useEffect } from "react";
import "./styles.css";
import { getLyrics } from "../../utils/apiCalls";
import { useStateValue } from "../../state";

const Lyrics = () => {
  const [forceFetchLyrics, setForceFetchLyrics] = useState(0);
  const { state, dispatch } = useStateValue();
  useEffect(() => {
    getLyrics(state.credentials.accessToken).then(response => {
      console.log(response);
    });
  }, [forceFetchLyrics]);
  return <div className="lyrics"></div>;
};

export default Lyrics;
