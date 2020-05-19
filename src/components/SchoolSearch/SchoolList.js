import React from "react";
import SchoolMealsPage from "../../pages/SchoolMealsPage";
import { goTo } from "react-chrome-extension-router";
import PropTypes from "prop-types";

export default function SchoolList({ schools }) {
  const setSchool = (idx) => {
    const school_id = document
      .getElementsByClassName("school_list")
      [idx].getAttribute("school_id");
    const office_code = document
      .getElementsByClassName("school_list")
      [idx].getAttribute("office_code");
    /* global chrome */
    chrome.storage.sync.set({ school_id: school_id, office_code: office_code });

    goTo(SchoolMealsPage);
  };

  return (
    <div className="school_list_area">
      {schools.map((school, index) => (
        <div
          className="school_list"
          key={index}
          school_id={school.school_id}
          office_code={school.office_code}
          onClick={() => setSchool(index)}
        >
          <div className="school_list_name">{school.school_name}</div>
        </div>
      ))}
    </div>
  );
}

SchoolList.prototype = {
  schools: PropTypes.arrayOf(PropTypes.object)
};
