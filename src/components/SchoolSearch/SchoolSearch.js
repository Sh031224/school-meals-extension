import React, { useState } from "react";
import axios from "axios";
import { server } from "../../config/index.json";
import "./SchoolSearch.scss";
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

  const getSchoolList = async (e) => {
    if (e.key === "Enter") {
      if (school) {
        getApi().then((response) => {
          setSchoolList(response.data.data.school);
        });
      }
    }
  };

  return (
    <div className="school_search">
      <h2 className="school_search__title">School Meals Extenstion</h2>
      <div className="school_search__box">
        <input
          className="school_search__input"
          onChange={onChange}
          value={school}
          placeholder="학교를 검색해주세요."
          onKeyPress={getSchoolList}
        />
      </div>
      <SchoolList schools={schoolList} />
    </div>
  );
}
