import React from "react";
import { goTo } from "react-chrome-extension-router";
import { MdArrowBack, MdArrowForward, MdRefresh } from "react-icons/md";
import SearchPage from "../../pages/SearchPage";
import moment from "moment";
import MainMeals from "./MainMeals";
import "./Main.scss";

interface MainProps {
  schedules: string;
  scheduleList: string;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  hover: boolean;
  setHover: React.Dispatch<React.SetStateAction<boolean>>;
  meals: Array<string | null>;
  calories: Array<string | null>;
}

const Main = ({
  scheduleList,
  schedules,
  date,
  setDate,
  hover,
  setHover,
  meals,
  calories
}: MainProps) => {
  return (
    <>
      <div className="main">
        <div className="main_header">
          <h2 title={scheduleList}>{schedules}</h2>
        </div>
        <div className="main_btn_area">
          <button
            className="main_btn"
            onClick={() => {
              setDate(
                new Date(moment(date).add("days", -1).format("YYYY-MM-DD"))
              );
            }}
          >
            <MdArrowBack />
          </button>
          <button
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => setDate(new Date())}
            className="main_btn main_btn_today"
          >
            {hover ? (
              <MdRefresh className="main_btn_icon" />
            ) : (
              <>{moment(date).format("MM/DD")}</>
            )}
          </button>
          <button
            className="main_btn"
            onClick={() => {
              setDate(
                new Date(moment(date).add("days", 1).format("YYYY-MM-DD"))
              );
            }}
          >
            <MdArrowForward />
          </button>
        </div>
        <MainMeals meals={meals} calories={calories} />
        <div className="main_footer">
          <span
            onClick={() => {
              goTo(SearchPage);
            }}
          >
            School Change
          </span>
          <a
            href="https://github.com/Sh031224/school_meals_extention"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </div>
      </div>
    </>
  );
};

export default Main;
