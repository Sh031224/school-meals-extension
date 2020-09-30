import React from "react";
import "./SearchListItem.scss";

interface SearchListItemProps {
  item: SchoolType;
  idx: number;
  selectSchool: (idx: number) => void;
}

interface SchoolType {
  school_name: string;
  school_locate: string;
  office_code: string;
  school_id: number;
}

const SearchListItem = ({ item, idx, selectSchool }: SearchListItemProps) => {
  return (
    <div className="search_list_item" onClick={() => selectSchool(idx)}>
      <div className="search_list_item_name" title={item.school_locate}>
        {item.school_name}
      </div>
      <div className="search_list_item_location">{item.school_locate}</div>
    </div>
  );
};

export default SearchListItem;
