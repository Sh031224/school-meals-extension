import React, { useState, useEffect } from "react";
import axios from "axios";
import dateFormat from "dateformat";
import { server } from "../../config/index.json";
import "./SchoolMeals.scss";
import SchoolSearchPage from "../../pages/SchoolSearchPage";
import { goTo } from "react-chrome-extension-router";
import SchoolMealsList from "./SchoolMealsList";
import { MdRefresh, MdArrowBack, MdArrowForward } from "react-icons/md";

export default function SchoolMeals({ history }) {
  const [scheduleList, setScheduleList] = useState("");
  const [schedule, setSchedule] = useState("");
  const [meals, setMeals] = useState([]);
  const [today, setToday] = useState(new Date());
  const [hover, setHover] = useState(false);
  const [error, setError] = useState(false);
  const [printDay, setPrintDay] = useState(dateFormat(today, "mm/dd"));
  const [config, setConfig] = useState({});

  const getApi = async (school_id, office_code) => {
    const meal = await axios.get(
      `${server}/meal?date=${today}&school_id=${school_id}&office_code=${office_code}`
    );
    return meal;
  };

  const getScheduleApi = async (school_id, office_code) => {
    const schedule = await axios.get(
      `${server}/schedule?date=${today}&school_id=${school_id}&office_code=${office_code}`
    );
    return schedule;
  };

  const getMeals = async (school_id, office_code) => {
    await getApi(school_id, office_code)
      .then((res) => {
        setMeals(res.data.data.meal);
      })
      .catch((error) => {
        if (error.response.status) {
          if (error.response.status === 404) {
            setMeals([]);
          }
        } else {
          setMeals([]);
          setError(true);
        }
      });
  };

  const getSchedule = async (school_id, office_code) => {
    setScheduleList("");
    await getScheduleApi(school_id, office_code)
      .then((res) => {
        setSchedule(
          `${res.data.data.scheduleList[0].name}
            ${
              res.data.data.scheduleList.length > 1
                ? " 외 " + (res.data.data.scheduleList.length - 1) + "개의 일정"
                : ""
            }`
        );
        let list = "";
        res.data.data.scheduleList.forEach((item, index) => {
          if (index === 0) {
            list = item.name + "   ";
          } else {
            list = list + item.name + "   ";
          }
        });
        setScheduleList(list);
      })
      .catch((error) => {
        if (error.response.status) {
          if (error.response.status === 404) {
            setSchedule("일정이 없습니다.");
          }
        } else {
          setSchedule("오류가 발생하였습니다.");
        }
      });
  };

  const mouseEnter = () => {
    setHover(true);
  };

  const mouseLeave = () => {
    setHover(false);
  };

  const prevDay = () => {
    const day = today;
    day.setDate(today.getDate() - 1);
    setToday(day);
    setPrintDay(dateFormat(today, "mm/dd"));
    getMeals(config.school_id, config.office_code);
    getSchedule(config.school_id, config.office_code);
  };

  const todayDay = () => {
    const day = new Date();
    setToday(day);
    setPrintDay(dateFormat(day, "mm/dd"));

    window.location.reload();
  };

  const nextDay = () => {
    const day = today;
    day.setDate(today.getDate() + 1);
    setToday(day);
    setPrintDay(dateFormat(today, "mm/dd"));
    getMeals(config.school_id, config.office_code);
    getSchedule(config.school_id, config.office_code);
  };

  useEffect(() => {
    const keys = ["school_id", "office_code"];
    /* global chrome */
    chrome.storage.sync.get(keys, (items) => {
      setConfig({ school_id: items.school_id, office_code: items.office_code });
      getMeals(items.school_id, items.office_code);
      getSchedule(items.school_id, items.office_code);
    });
  }, []);

  return (
    <div className="school_meals">
      <div className="school_meals_header">
        <h2 title={scheduleList}>{schedule}</h2>
      </div>
      <div className="school_meals_btn_area">
        <button className="school_meals_btn" onClick={prevDay}>
          <MdArrowBack />
        </button>
        {hover ? (
          <button
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
            className="school_meals_btn school_meals_btn_today"
            onClick={todayDay}
          >
            <MdRefresh className="school_meals_btn_icon" />
          </button>
        ) : (
          <button
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
            onClick={todayDay}
            className="school_meals_btn school_meals_btn_today"
          >
            {printDay}
          </button>
        )}

        <button className="school_meals_btn" onClick={nextDay}>
          <MdArrowForward />
        </button>
      </div>
      <SchoolMealsList meal={meals} error={error} />
      <div className="school_meals_footer">
        <span
          onClick={() => {
            goTo(SchoolSearchPage);
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
  );
}
