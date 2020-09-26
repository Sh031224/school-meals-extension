import React from "react";
import { Router } from "react-chrome-extension-router";
import MainPage from "../pages/MainPage";

function App() {
  return (
    <div className="App">
      <Router>
        <MainPage />
      </Router>
    </div>
  );
}

export default App;
