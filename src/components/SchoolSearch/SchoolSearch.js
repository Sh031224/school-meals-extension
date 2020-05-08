import React, { useState } from "react";
import axios from "axios";
import { server } from "../../config/index.json";
import "./SchoolSearch.scss";

export default function Search() {
  const [school, setSchool] = useState("");

  const onChange = (e) => {
    setSchool(e.target.value);
  };

  const getSchoolList = async () => {
    if (school) {
      const a = await axios.get(`${server}/search?school_name=${school}`);
      console.log(a);
    }
  };

  return (
    <div className="school_search">
      <h2 className="school_search__title">School Meals Extenstion</h2>
      <div className="school_search__box">
        <input className="school_search__input" onChange={onChange} value={school} placeholder="학교를 검색해주세요." />
      </div>
    </div>
  );
}
