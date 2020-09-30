import React from "react";
import { Router } from "react-chrome-extension-router";
import MainPage from "../pages/MainPage";

const App = () => {
  return (
    <div className="App">
      <Router>
        <MainPage />
      </Router>
    </div>
  );
};

export default App;
