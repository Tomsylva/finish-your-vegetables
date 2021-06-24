import React from "react";
import RestaurantList from "../components/Restaurant/RestaurantList";
import MealList from "../components/Meal/MealList";
import "../App.css";
import "./AvailablePage.css";

function AvailablePage(props) {
  const { user } = props;

  return (
    <div className="Available-page">
      <h1>Steaming hot food, looking to fill a hole in your area!</h1>
      <div className="Available-content">
        <div className="Available-section">
          <RestaurantList className="RestaurantList-compomnent" user={user} />
        </div>
        <div className="Available-section">
          <MealList className="MealList-component" user={user} />
        </div>
      </div>
    </div>
  );
}

export default AvailablePage;
