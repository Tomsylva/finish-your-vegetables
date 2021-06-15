import React from "react";
import RestaurantList from "../components/Restaurant/RestaurantList";

function AvailablePage(props) {
  const { user } = props;

  return (
    <div>
      <h1>Steaming hot food, looking to fill a hole in your area!</h1>
      <RestaurantList user={user} />
    </div>
  );
}

export default AvailablePage;
