import React from "react";
import CompletedMeal from "./CompletedMeal";
import ReservedMeal from "./ReservedMeal";

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
    <div>
      <h1>RESTAURANT PORTAL</h1>
      <h2>Active Meals</h2>
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
      <h2>Completed Orders</h2>
      {activeCompletedList.map((completedMeal) => {
        return (
          <div key={`${completedMeal._id}`}>
            <CompletedMeal completedMeal={completedMeal} />
          </div>
        );
      })}
    </div>
  );
}

export default RestaurantPortal;
