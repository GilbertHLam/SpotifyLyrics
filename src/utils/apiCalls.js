import apiBaseUrl from "./apiBaseUrl";

const login = () => {
  fetch(apiBaseUrl + "login", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  }).then(response => {
    console.log(response);
  });
};

const callback = code => {
  return fetch(apiBaseUrl + "callback", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      code: code
    })
  });
};

const getLyrics = accessToken => {
  return fetch(apiBaseUrl + "getLyrics", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      accessToken: accessToken
    })
  });
};

const checkState = accessToken => {
  return fetch("https://api.spotify.com/v1/me/player", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + accessToken,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
  });
};

export { login, callback, getLyrics, checkState };
