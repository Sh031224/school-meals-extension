import React, { useCallback, useEffect, useRef, useState } from "react";
import { goTo } from "react-chrome-extension-router";
import Meals from "../../assets/api/Meals";
import ResponseType from "../../types/Response";
import Schedule from "../../assets/api/Schedule";
import Main from "../../components/Main";
import SearchPage from "../../pages/SearchPage";

interface MealsResponse extends ResponseType {
  data: {
    meal: Array<string | null>;
    calories: Array<string | null>;
  };
}

interface ScheduleResponse extends ResponseType {
  data: {
    scheduleList: Array<ScheduleType>;
  };
}

interface ScheduleType {
  name: string;
  data: string;
}

const MainContainer = () => {
  const [schoolId, setSchoolId] = useState<string>("");
  const [officeCode, setOfficeCode] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());

  const [meals, setMeals] = useState<Array<string | null>>([]);
  const [calories, setCalories] = useState<Array<string | null>>([]);

  const [schedules, setSchedules] = useState<string>("");
  const [scheduleList, setScheduleList] = useState<string>("");

  const [isSearch, setIsSearch] = useState<boolean>(false);

  const [hover, setHover] = useState<boolean>(false);

  const checkEl = useRef<HTMLInputElement>(null);

  const storageCheck = useCallback(() => {
    const keys = ["school_id", "office_code", "is_search"];

    chrome.storage.sync.get(keys, (items) => {
      if (items.office_code && items.school_id) {
        setSchoolId(items.school_id);
        setOfficeCode(items.office_code);
        if (typeof items.is_search === "boolean") {
          setIsSearch(items.is_search);
          if (checkEl.current) {
            checkEl.current.checked = items.is_search;
          }
        }
        console.log(items);
      } else {
        goTo(SearchPage);
      }
    });
  }, []);

  useEffect(() => {
    storageCheck();
  }, [storageCheck]);

  const getMealsCallback = useCallback(async () => {
    if (schoolId && officeCode) {
      setCalories([null]);
      setMeals(["불러오는 중", "불러오는 중", "불러오는 중"]);
      await Meals.GetMeals(schoolId, officeCode, date)
        .then((res: MealsResponse) => {
          setMeals(res.data.meal);
          setCalories(res.data.calories);
        })
        .catch((err: Error) => {
          if (err.message.indexOf("404") !== -1) {
            setMeals([]);
          } else {
            setMeals(["서버 오류", "서버 오류", "서버 오류"]);
          }
        });
    }
  }, [schoolId, officeCode, date]);

  const getScheduleCallback = useCallback(async () => {
    if (schoolId && officeCode) {
      setSchedules("불러오는 중");
      setScheduleList("");
      await Schedule.GetSchedules(schoolId, officeCode, date)
        .then((res: ScheduleResponse) => {
          setSchedules(
            `${res.data.scheduleList[0].name}
              ${
                res.data.scheduleList.length > 1
                  ? " 외 " + (res.data.scheduleList.length - 1) + "개의 일정"
                  : ""
              }`
          );
          let list = "";
          res.data.scheduleList.forEach((item, index) => {
            if (index === 0) {
              list = item.name + "   ";
            } else {
              list = list + item.name + "   ";
            }
          });
          setScheduleList(list);
        })
        .catch((err: Error) => {
          if (err.message.indexOf("404") !== -1) {
            setSchedules("일정이 없습니다.");
            setScheduleList("");
          } else {
            setScheduleList("");
            setSchedules("오류가 발생하였습니다.");
          }
        });
    }
  }, [schoolId, officeCode, date]);

  const onMealDoubleClick = useCallback(
    (name: string) => {
      if (isSearch) {
        chrome.tabs.create({
          url: `https://www.google.com/search?q=${name}&tbm=isch`
        });
      }
    },
    [isSearch]
  );

  const changeIsSearch = useCallback(() => {
    chrome.storage.sync.set({
      school_id: schoolId,
      office_code: officeCode,
      is_search: !isSearch
    });
  }, [isSearch, schoolId, officeCode]);

  useEffect(() => {
    getScheduleCallback();
    getMealsCallback();
  }, [getMealsCallback, getScheduleCallback]);

  return (
    <>
      <Main
        meals={meals}
        calories={calories}
        scheduleList={scheduleList}
        schedules={schedules}
        date={date}
        setDate={setDate}
        hover={hover}
        setHover={setHover}
        changeIsSearch={changeIsSearch}
        isSearch={isSearch}
        setIsSearch={setIsSearch}
        checkEl={checkEl}
        onMealDoubleClick={onMealDoubleClick}
      />
    </>
  );
};

export default MainContainer;
