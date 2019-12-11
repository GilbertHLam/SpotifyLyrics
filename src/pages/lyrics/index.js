import React, { useState, useEffect } from "react";
import "./styles.css";
import { getLyrics, checkState } from "../../utils/apiCalls";
import { useStateValue } from "../../state";
import LoadingWaves from "../../components/loadingWaves";
import Player from "../../components/player";
import Analysis from "../../components/analysis";

const Lyrics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [forceFetchLyrics, setForceFetchLyrics] = useState(0);
  const [spotifyAnalysis, setSpotifyAnalysis] = useState({});
  const [watsonAnalysis, setWatsonAnalysis] = useState({});
  const [lyrics, setLyrics] = useState("");
  const [spotifyState, setSpotifyState] = useState({});
  const [interval, setIntervalFunction] = useState();

  const { state, dispatch } = useStateValue();

  useEffect(() => {
    if (!state.credentials && localStorage.getItem("cachedAt")) {
      const cacheDay = new Date(localStorage.getItem("cachedAt"));
      const today = new Date();
      if (
        Math.abs(cacheDay.getTime() - today.getTime()) / (1000 * 60 * 60) >
        1
      ) {
        localStorage.clear();
        window.location.href = "https://localhost:3000";
      } else {
        dispatch({
          type: "setTokens",
          credentials: {
            accessToken: localStorage.getItem("accessToken")
          }
        });
      }
    } else if (!state.credentials) {
      window.location.href = "https://localhost:3000";
    }
  }, []);

  useEffect(() => {
    clearInterval(interval);
    setIntervalFunction(
      setInterval(
        () => {
          if (state.credentials) {
            const statePromise = checkState(state.credentials.accessToken)
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

            const setSpotifyStatePromise = new Promise(function(
              resolve,
              reject
            ) {
              resolve(setSpotifyState);
            });

            Promise.all([
              statePromise,
              currentStatePromise,
              setForceFetchPromise,
              setSpotifyStatePromise
            ]).then(function(values) {
              try {
                if (values[0].item.id !== values[1].songID) {
                  values[2](values[0].item.id);
                } else {
                  if (values[0].item) {
                    const object = {
                      songID: values[0].item.id,
                      song_title: values[0].item.name,
                      artist: values[0].item.artists[0].name,
                      image_url: values[0].item.album.images[1].url,
                      length: values[0].item.duration_ms,
                      is_playing: values[0].is_playing,
                      current: values[0].progress_ms
                    };
                    values[3](object);
                  }
                }
              } catch (error) {}
            });
          }
        },
        1000,
        spotifyState
      )
    );
  }, [spotifyState, setIntervalFunction]);

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
        setSpotifyAnalysis(response.spotifyAnalysis);
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
            background: `url(${spotifyState.image_url}) no-repeat center center fixed,linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.8)) `,
            backgroundSize: "cover"
          }}
        ></div>
        <div className="flex">
          <div className="container">
            <h1>{`${formatString(spotifyState.song_title)} - ${formatString(
              spotifyState.artist
            )}`}</h1>
            <div
              className="lyrics"
              dangerouslySetInnerHTML={{ __html: lyrics }}
            />
          </div>
          <div className="analysis">
            <Analysis watson={watsonAnalysis} spotify={spotifyAnalysis} />
          </div>
        </div>
        <Player isPlaying={spotifyState.is_playing} />
      </div>
    </>
  );
};

export default Lyrics;