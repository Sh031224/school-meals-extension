import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import "./MainMealsItem.scss";

interface MainMealsItemProps {
  meal: string | null;
  calorie: string | null;
  time: string;
  onMealDoubleClick: (name: string) => void;
}

const MainMealsItem = ({
  meal,
  time,
  calorie,
  onMealDoubleClick
}: MainMealsItemProps) => {
  return (
    <>
      <div className="main_meals_item">
        <div className="main_meals_item_title">{time}</div>
        <div className="main_meals_item_content">
          <Scrollbars autoHide>
            {meal ? (
              <div>
                {meal !== "불러오는 중" ? (
                  <>
                    {meal.split("<br/>").map((line) => {
                      return (
                        <div onDoubleClick={() => onMealDoubleClick(line)}>
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
