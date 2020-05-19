import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../../config/index.json";
import "./SchoolSearch.scss";
import SchoolMealsPage from "../../pages/SchoolMealsPage";
import { goTo } from "react-chrome-extension-router";
import { MdArrowBack } from "react-icons/md";
import question from "../../assets/img/question.png";
import SchoolList from "./SchoolList";

export default function Search() {
  const [schoolList, setSchoolList] = useState([]);
  const [back, setBack] = useState(Boolean);

  const [school, setSchool] = useState("");

  const onChange = (e) => {
    setSchool(e.target.value);
  };

  const getApi = async () => {
    const list = await axios.get(`${server}/search?school_name=${school}`);
    return list;
  };

  const keyPress = (e) => {
    if (e.key === "Enter") {
      getSchoolList(e);
    }
  };

  const getSchoolList = (e) => {
    e.preventDefault();
    if (school) {
      getApi()
        .then((response) => {
          setSchoolList(response.data.data.school);
        })
        .catch(() => {
          setSchoolList([]);
        });
    }
  };

  useEffect(() => {
    const keys = ["school_id", "office_code"];
    /* global chrome */
    chrome.storage.sync.get(keys, (items) => {
      if (items.school_id && items.office_code) {
        setBack(true);
      } else {
        setBack(false);
      }
    });
  }, []);

  return (
    <div className="school_search">
      {back ? (
        <div
          onClick={() => {
            goTo(SchoolMealsPage);
          }}
          className="school_search_back"
        >
          <MdArrowBack />
        </div>
      ) : (
        ""
      )}
      <h2 className="school_search_title">Meals Extension</h2>
      <div className="school_search_box">
        <form onSubmit={getSchoolList} className="school_search_form">
          <input
            className="school_search_input"
            onChange={onChange}
            value={school}
            placeholder="학교를 검색해주세요."
            onKeyPress={keyPress}
            required
          />
        </form>
        {schoolList.length ? (
          <div className="school_search_content">
            <SchoolList schools={schoolList} />
          </div>
        ) : (
          <div className="school_search_content">
            <img src={question} alt="question" />
            <span className="school_search_content_span">
              검색 결과가 없습니다.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
