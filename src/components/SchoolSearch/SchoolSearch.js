import React, { useState } from "react";
import axios from "axios";
import { server } from "../../config/index.json";
import "./SchoolSearch.scss";
import search from "../../assets/img/search.png";
import question from "../../assets/img/question.png";
import SchoolList from "./SchoolList";

export default function Search() {
  const [schoolList, setSchoolList] = useState([]);

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

  return (
    <div className="school_search">
      <h2 className="school_search_title">School Meals Extenstion</h2>
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
          <button type="submit" className="school_search_btn">
            <img src={search} alt="search" />
          </button>
        </form>
        {schoolList.length ? (
          <div className="school_search_content">
            <SchoolList schools={schoolList} />
          </div>
        ) : (
          <div className="school_list_box">
            <img src={question} alt="question" />
            <span>검색 결과가 없습니다.</span>
          </div>
        )}
      </div>
    </div>
  );
}
