import React from "react";
import "./MainMealsItem.scss";

interface MainMealsItemProps {
  meal: string | null;
  time: string;
}

const MainMealsItem = ({ meal, time }: MainMealsItemProps) => {
  return (
    <>
      <div className="main_meals_item">
        <div className="main_meals_item_title">{time}</div>
        <div className="main_meals_item_content">
          {meal ? (
            <span>
              {meal.split("<br/>").map((line) => {
                return (
                  <span>
                    {line}
                    <br />
                  </span>
                );
              })}
            </span>
          ) : (
            <span>급식이 없습니다.</span>
          )}
        </div>
      </div>
    </>
  );
};

export default MainMealsItem;
