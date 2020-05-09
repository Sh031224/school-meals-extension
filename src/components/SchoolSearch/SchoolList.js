import React from "react";
import PropTypes from "prop-types";

export default function SchoolList({ schools }) {
  console.log(schools);
  return (
    <div>
      {schools.map((school) => (
        <div
          className={school.office_id}
          key={school.school_id}
          id={school.school_id}
        >
          {school.school_name}
        </div>
      ))}
    </div>
  );
}

SchoolList.prototype = {
  schools: PropTypes.arrayOf(PropTypes.object),
};
