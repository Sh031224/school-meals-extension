import React from "react";
import { goTo } from "react-chrome-extension-router";
import { MdArrowBack } from "react-icons/md";
import MainPage from "../../pages/MainPage";
import question from "../../assets/images/question.png";
import "./Search.scss";
import { Scrollbars } from "react-custom-scrollbars";
import SearchList from "./SearchList";

interface SearchProps {
  schoolList: Array<SchoolType>;
  selectSchool: (idx: number) => void;
  getSchoolList: () => Promise<void>;
  goBack: boolean;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
}

interface SchoolType {
  school_name: string;
  school_locate: string;
  office_code: string;
  school_id: number;
}

const Search = ({
  schoolList,
  selectSchool,
  getSchoolList,
  goBack,
  search,
  setSearch,
  loading
}: SearchProps) => {
  return (
    <div className="search">
      {goBack && (
        <div
          onClick={() => {
            goTo(MainPage);
          }}
          className="search_back"
        >
          <MdArrowBack />
        </div>
      )}
      <h2 className="search_title">Meals Extension</h2>
      <div className="search_box">
        <div className="search_form">
          <input
            autoFocus
            className="search_input"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            value={search}
            placeholder="학교를 검색해주세요."
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                getSchoolList();
              }
            }}
            required
          />
        </div>
        <div className="search_content">
          {schoolList.length ? (
            // <Scrollbars autoHide>
            <SearchList schoolList={schoolList} selectSchool={selectSchool} />
          ) : (
            // </Scrollbars>
            <>
              <img src={question} alt="question" />
              {loading ? (
                <span className="search_content_span">불러오는 중</span>
              ) : (
                <span className="search_content_span">
                  검색 결과가 없습니다.
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
