import React, { useState, useEffect } from "react";
import "./styles.css";
import { getLyrics, checkState } from "../../utils/apiCalls";
import { useStateValue } from "../../state";
import LoadingWaves from "../../components/loadingWaves";

const Lyrics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [forceFetchLyrics, setForceFetchLyrics] = useState(0);
  const [spotifyAnalysis, setSpotifyAnalysis] = useState({});
  const [watsonAnalysis, setWatsonAnalysis] = useState({});
  const [lyrics, setLyrics] = useState("");
  const [spotifyState, setSpotifyState] = useState({});
  const [check, setCheck] = useState(false);

  const { state } = useStateValue();

  useEffect(() => {
    setInterval(
      () => {
        const statePromise = checkState(
          state.credentials
            ? state.credentials.accessToken
            : localStorage.getItem("accessToken")
        )
          .then(response => {
            return response.json();
          })
          .then(response => {
            return response;
          });

        const currentStatePromise = new Promise((resolve, reject) => {
          resolve(spotifyState);
        }, spotifyState);

        const setForceFetchPromise = new Promise(function(resolve, reject) {
          resolve(setForceFetchLyrics);
        });

        Promise.all([
          statePromise,
          currentStatePromise,
          setForceFetchPromise
        ]).then(function(values) {
          try {
            if (values[0].item.id !== values[1].songID) {
              values[2](values[0].item.id);
            }
          } catch (error) {}
        });
      },
      5000,
      spotifyState
    );
  }, [spotifyState]);

  useEffect(() => {
    setIsLoading(true);
    getLyrics(
      state.credentials
        ? state.credentials.accessToken
        : localStorage.getItem("accessToken")
    )
      .then(response => {
        return response.json();
      })
      .then(response => {
        setLyrics(response.lyrics);
        setSpotifyState(response.spotify);
        setSpotifyAnalysis(response.spotifyAnalyis);
        setWatsonAnalysis(response.watsonAnalysis);
        setIsLoading(false);
      });
  }, [state.credentials, forceFetchLyrics]);

  const formatString = string => {
    let parts = string.split("-");
    parts = parts.map(item => {
      return item.charAt(0).toUpperCase() + item.slice(1);
    });
    const formatted = parts.join(" ");
    return formatted;
  };

  return isLoading ? (
    <div className="loading">
      <LoadingWaves message="Retrieving lyrics..." />
    </div>
  ) : (
    <>
      <div className="wrapper">
        <div
          className="background-image"
          style={{
            background: `url(${spotifyState.image_url}) no-repeat center center fixed,linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)) `,
            backgroundSize: "cover"
          }}
        >
        </div>
        <div className="container">
          <h1>{`${formatString(spotifyState.song_title)} - ${formatString(
            spotifyState.artist
          )}`}</h1>
          <div
            className="lyrics"
            dangerouslySetInnerHTML={{ __html: lyrics }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Lyrics;
