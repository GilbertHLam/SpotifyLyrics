import React from "react";
import "./App.css";
import Home from "./pages/home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { StateProvider } from "./state";
import Callback from "./pages/callback";
import Lyrics from "./pages/lyrics";

function App() {
  return (
    <>
      <StateProvider>
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/callback" component={Callback} />
          <Route path="/lyrics" component={Lyrics} />
          {/* <Route path="/dashboard" component={Dashboard} />
        <Route path="/loginRedirect" component={LoginRedirect} /> */}
        </Router>
      </StateProvider>
    </>
  );
}

export default App;
