import React from "react";
import PropTypes from "prop-types";
import wave1 from "../../assets/img/meals-wave1.png";
import wave2 from "../../assets/img/meals-wave2.png";
import wave3 from "../../assets/img/meals-wave3.png";
import sunrise from "../../assets/img/sunrise.png";
import sun from "../../assets/img/sun.png";
import moon from "../../assets/img/moon.png";
import star from "../../assets/img/star.png";

function SchoolMealsList({ meal }) {
  return (
    <div className="school_meals_list">
      <div className="school_meals_list_1 school_meals_list_box">
        <div className="school_meals_list_title">
          <img src={sunrise} alt="sunrise" />
          <span>아침</span>
        </div>
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
        <img src={wave1} alt="wave" className="school_meals_wave" />
      </div>
      <div className="school_meals_list_2 school_meals_list_box">
        <div className="school_meals_list_title">
          <img src={sun} alt="sun" />
          <span>점심</span>
        </div>
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
        <img src={wave2} alt="wave" className="school_meals_wave" />
      </div>
      <div className="school_meals_list_3 school_meals_list_box">
        <div className="school_meals_list_title">
          <img src={moon} alt="moon" />
          <span>저녁</span>
        </div>
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
        <img src={wave3} alt="wave" className="school_meals_wave" />
        <img src={star} alt="star" className="school_meals_star" />
      </div>
    </div>
  );
}

SchoolMealsList.propTypes = {
  meal: PropTypes.arrayOf(PropTypes.string)
};

export default SchoolMealsList;
