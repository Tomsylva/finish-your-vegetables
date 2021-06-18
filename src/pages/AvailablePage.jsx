import React from "react";
import RestaurantList from "../components/Restaurant/RestaurantList";
import MealList from "../components/Meal/MealList";
import "../App.css";

function AvailablePage(props) {
  const { user } = props;

  return (
    <div>
      <h1>Steaming hot food, looking to fill a hole in your area!</h1>
      <RestaurantList user={user} />
      <MealList user={user} />
    </div>
  );
}

export default AvailablePage;
