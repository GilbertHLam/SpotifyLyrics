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

export { login, callback, getLyrics };
