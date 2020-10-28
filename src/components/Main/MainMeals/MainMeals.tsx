import React from "react";
import "./MainMeals.scss";
import MainMealsItem from "./MainMealsItem";

interface MainMealsProps {
  meals: Array<string | null>;
  calories: Array<string | null>;
  onMealDoubleClick: (name: string) => void;
}

const MainMeals = ({ meals, calories, onMealDoubleClick }: MainMealsProps) => {
  return (
    <>
      <div className="main_meals">
        <MainMealsItem
          onMealDoubleClick={onMealDoubleClick}
          meal={meals[0]}
          calorie={calories[0]}
          time={"아침"}
        />
        <MainMealsItem
          onMealDoubleClick={onMealDoubleClick}
          meal={meals[1]}
          calorie={calories[1]}
          time={"점심"}
        />
        <MainMealsItem
          onMealDoubleClick={onMealDoubleClick}
          meal={meals[2]}
          calorie={calories[2]}
          time={"저녁"}
        />
      </div>
    </>
  );
};

export default MainMeals;
