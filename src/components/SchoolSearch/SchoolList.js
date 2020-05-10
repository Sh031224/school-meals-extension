import React from "react";
import PropTypes from "prop-types";

export default function SchoolList({ schools, history }) {
  const setSchool = (idx) => {
    const school_id = document
      .getElementsByClassName("school_list")
      [idx].getAttribute("school_id");
    const office_code = document
      .getElementsByClassName("school_list")
      [idx].getAttribute("office_code");
    /* global chrome */
    chrome.storage.sync.set({ school_id: school_id, office_code: office_code });

    history.push("/");
  };

  return (
    <div>
      {schools.map((school, index) => (
        <div
          className="school_list"
          key={index}
          school_id={school.school_id}
          office_code={school.office_code}
          onClick={() => setSchool(index)}
        >
          <div className="school_list_name">
            <span className="school_list_name_title">학교명</span>
            <span className="school_list_name_text">{school.school_name}</span>
          </div>
          <div className="school_list_address">
            <span className="school_list_address_title">주소</span>
            <span className="school_list_address_text">
              {school.school_locate}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

SchoolList.prototype = {
  schools: PropTypes.arrayOf(PropTypes.object)
};
