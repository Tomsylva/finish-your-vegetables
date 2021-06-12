import React from "react";
import * as MEAL_SERVICE from "../../services/meal.service";
import * as CONSTS from "../../utils/consts";

function EditMeal(props) {
  const { currentRestaurant, user, singleMeal } = props;
  return (
    <div>
      <h1>{currentRestaurant}</h1>
      <h1>{user}</h1>
      <h1>{singleMeal}</h1>
    </div>
  );
}

export default EditMeal;
