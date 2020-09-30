import React from "react";
import "./SearchList.scss";
import SearchListItem from "./SearchListItem";

interface SearchListProps {
  schoolList: Array<SchoolType>;
  selectSchool: (idx: number) => void;
}

interface SchoolType {
  school_name: string;
  school_locate: string;
  office_code: string;
  school_id: number;
}

const SearchList = ({ schoolList, selectSchool }: SearchListProps) => {
  return (
    <div className="search_list">
      {schoolList.map((item: SchoolType, idx: number) => (
        <SearchListItem
          item={item}
          idx={idx}
          selectSchool={selectSchool}
          key={idx}
        />
      ))}
    </div>
  );
};

export default SearchList;
