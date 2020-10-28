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
  changeIsSearch: () => void;
  isSearch: boolean;
  setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
  checkEl: React.RefObject<HTMLInputElement>;
  onMealDoubleClick: (name: string) => void;
}

const Main = ({
  scheduleList,
  schedules,
  date,
  setDate,
  hover,
  setHover,
  meals,
  calories,
  changeIsSearch,
  isSearch,
  setIsSearch,
  checkEl,
  onMealDoubleClick
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
        <MainMeals
          onMealDoubleClick={onMealDoubleClick}
          meals={meals}
          calories={calories}
        />
        <div className="main_footer">
          <label
            className="main_footer_btn"
            title="메뉴 더블 클릭 시 구글 검색 결과로 이동되는 기능입니다."
          >
            <div className="main_footer_btn_toggle">
              <input
                ref={checkEl}
                type="checkbox"
                checked={isSearch}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setIsSearch(e.target.checked);
                  changeIsSearch();
                }}
              />
              <div className="main_footer_btn_toggle_entity" />
            </div>
            <div className="main_footer_btn_text">음식 검색</div>
          </label>
          <span
            onClick={() => {
              goTo(SearchPage);
            }}
          >
            School Change
          </span>
          <a
            href="https://github.com/Sh031224/school_meals_extension"
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
