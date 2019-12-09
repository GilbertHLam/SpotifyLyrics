import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext({
  state: {},
  dispatch: () => {}
});

export const reducer = (prevState, action) => {
  switch (action.type) {
    case "setTokens":
      return {
        ...prevState,
        credentials: action.credentials
      };

    default:
      return prevState;
  }
};

export const StateProvider = props => {
  const [state, dispatch] = useReducer(reducer, {});
  const value = { state, dispatch };
  return (
    <StateContext.Provider value={value}>
      {props.children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
