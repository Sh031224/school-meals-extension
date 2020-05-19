import React from "react";
import PropTypes from "prop-types";

function SchoolMealsList({ meal }) {
  return (
    <div className="school_meals_list">
      <div className="school_meals_list_box">
        <div className="school_meals_list_title">아침</div>
        <div className="school_meals_list_content">
          {meal[0] ? (
            <span>
              {meal[0].split("<br/>").map((line) => {
                return (
                  <span>
                    {line}
                    <br />
                  </span>
                );
              })}
            </span>
          ) : (
            <span>급식이 없습니다.</span>
          )}
        </div>
      </div>
      <div className="school_meals_list_box">
        <div className="school_meals_list_title">점심</div>
        <div className="school_meals_list_content">
          {meal[1] ? (
            <span>
              {meal[1].split("<br/>").map((line) => {
                return (
                  <span>
                    {line}
                    <br />
                  </span>
                );
              })}
            </span>
          ) : (
            <span>급식이 없습니다.</span>
          )}
        </div>
      </div>
      <div className="school_meals_list_box">
        <div className="school_meals_list_title">저녁</div>
        <div className="school_meals_list_content">
          {meal[2] ? (
            <span>
              {meal[2].split("<br/>").map((line) => {
                return (
                  <span>
                    {line}
                    <br />
                  </span>
                );
              })}
            </span>
          ) : (
            <span>급식이 없습니다.</span>
          )}
        </div>
      </div>
    </div>
  );
}

SchoolMealsList.propTypes = {
  meal: PropTypes.arrayOf(PropTypes.string)
};

export default SchoolMealsList;
