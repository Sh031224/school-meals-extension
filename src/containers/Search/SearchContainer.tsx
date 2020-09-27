import React, { useCallback, useEffect, useState } from "react";
import School from "../../assets/api/School";
import getStorage from "../../lib/getStorage";
import ResponseType from "../../types/Response";

interface SchoolSearchResponse extends ResponseType {
  data: {
    school: Array<SchoolType>;
  };
}

interface SchoolType {
  school_name: string;
  school_locate: string;
  office_code: string;
  school_id: number;
}

const SearchContainer = ({}) => {
  const [goBack, setGoBack] = useState<boolean>(false);
  const [schoolList, setSchoolList] = useState<Array<SchoolType>>([]);

  const [search, setSearch] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const storageCheck = useCallback(() => {
    const isExisit = getStorage();
    if (isExisit.office_code && isExisit.school_id) {
      setGoBack(true);
    } else {
      setGoBack(false);
    }
  }, []);

  useEffect(() => {
    storageCheck();
  }, [storageCheck]);

  const getScheduleCallback = useCallback(async () => {
    setLoading(true);
    setSchoolList([]);
    setIsEmpty(false);
    await School.SearchSchool(search)
      .then((res: SchoolSearchResponse) => {
        setSchoolList(res.data.school);
      })
      .catch((err: Error) => {
        if (err.message.indexOf("404") !== -1) {
          setIsEmpty(true);
        }
      });
    setLoading(false);
  }, [search]);

  return (
    <>
      <div></div>
    </>
  );
};

export default SearchContainer;
