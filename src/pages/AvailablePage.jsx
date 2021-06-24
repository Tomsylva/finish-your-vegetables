import React from "react";
import RestaurantList from "../components/Restaurant/RestaurantList";
import MealList from "../components/Meal/MealList";
import "../App.css";
import "./AvailablePage.css";

function AvailablePage(props) {
  const { user } = props;
  const [filterWord, setFilterWord] = React.useState("showall");

  return (
    <div className="Available-page">
      <h1 id="Available-h1">
        Steaming hot food, looking to fill a hole in your area!
      </h1>
      <div className="Available-content">
        <div className="Available-section">
          <RestaurantList
            className="RestaurantList-compomnent"
            user={user}
            filterWord={filterWord}
          />
        </div>
        <div className="Available-section">
          <MealList
            className="MealList-component"
            user={user}
            filterWord={filterWord}
            setFilterWord={setFilterWord}
          />
        </div>
      </div>
    </div>
  );
}

export default AvailablePage;
