import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import "./MainMealsItem.scss";

interface MainMealsItemProps {
  meal: string | null;
  calorie: string | null;
  time: string;
}

const MainMealsItem = ({ meal, time, calorie }: MainMealsItemProps) => {
  return (
    <>
      <div className="main_meals_item">
        <div className="main_meals_item_title">{time}</div>
        <div className="main_meals_item_content">
          <Scrollbars autoHide>
            {meal ? (
              <div
                title={"해당 메뉴를 더블클릭 시 구글 검색 결과로 이동됩니다."}
              >
                {meal !== "불러오는 중" ? (
                  <>
                    {meal.split("<br/>").map((line) => {
                      return (
                        <div
                          onDoubleClick={() =>
                            chrome.tabs.create({
                              url: `https://www.google.com/search?q=${line}&tbm=isch`
                            })
                          }
                        >
                          {line}
                          <br />
                        </div>
                      );
                    })}
                    {calorie && (
                      <div className="main_meals_item_content_calorie">
                        {calorie}
                      </div>
                    )}
                  </>
                ) : (
                  <div>{meal}</div>
                )}
              </div>
            ) : (
              <div>급식이 없습니다.</div>
            )}
          </Scrollbars>
        </div>
      </div>
    </>
  );
};

export default MainMealsItem;
