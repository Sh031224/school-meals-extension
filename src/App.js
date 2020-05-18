import React, { useEffect } from "react";
import { Router, goTo } from "react-chrome-extension-router";
import SchoolMealsPage from "./pages/SchoolMealsPage";
import SchoolSearchPage from "./pages/SchoolSearchPage";
import "./App.scss";

function App() {
  useEffect(() => {
    const keys = ["school_id", "office_code"];
    /* global chrome */
    chrome.storage.sync.get(keys, (items) => {
      if (!items.office_code || !items.school_id) {
        goTo(SchoolSearchPage);
      }
    });
  }, []);

  return (
    <Router>
      <SchoolMealsPage />
    </Router>
  );
}

export default App;
