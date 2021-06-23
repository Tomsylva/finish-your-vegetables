import React from "react";
import CompletedMeal from "./CompletedMeal";
import ReservedMeal from "./ReservedMeal";
import "../../pages/SingleRestaurant.css";

function RestaurantPortal(props) {
  const { restaurant } = props;
  const { meals } = restaurant;
  const [activeRestaurant, setActiveRestaurant] = React.useState(restaurant);
  const [activeMealList, setActiveMealList] = React.useState(meals);
  const [activeCompletedList, setActiveCompletedList] = React.useState(
    activeRestaurant.completedOrders
  );

  function handleUpdateCompleted(completedOrders) {
    setActiveCompletedList(completedOrders);
    window.location.reload();
    //UPDATE STATE TO RERENDER?????
  }

  return (
    <div className="Restaurant-portal">
      <h2>RESTAURANT PORTAL</h2>
      <div className="portal-sections">
      <div className="portal-left">
      <h3>Active Meals</h3>
      {activeMealList.map((meal) => {
        return (
          <div key={meal.mealName}>
            <ReservedMeal
              meal={meal}
              activeRestaurant={activeRestaurant}
              setActiveRestaurant={setActiveRestaurant}
              setActiveMealList={setActiveMealList}
              handleUpdateCompleted={handleUpdateCompleted}
            />
          </div>
        );
      })}
      </div>
      <div className="portal-right">
      <h3>Completed Orders</h3>
      {activeCompletedList.map((completedMeal) => {
        return (
          <div key={`${completedMeal._id}`}>
            <CompletedMeal completedMeal={completedMeal} />
          </div>
        );
      })}
      </div>
      </div>
    </div>
  );
}

export default RestaurantPortal;
