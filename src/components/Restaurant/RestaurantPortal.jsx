import React from "react";
import * as MEAL_SERVICE from "../../services/meal.service";

function RestaurantPortal(props) {
  const { restaurant } = props;
  const { meals } = restaurant;
  const [showCollect, setShowCollect] = React.useState(false);
  const [userCollect, setUserCollect] = React.useState({});

  function handleCollect(event, userId) {
    event.preventDefault();
    MEAL_SERVICE.COLLECT_MEAL(userId).then((response) => {
      console.log(response.data);
      setShowCollect(true);
      setUserCollect(response.data);
    });
  }

  function hideCollect(event) {
    event.preventDefault();
    setShowCollect(false);
    setUserCollect({});
  }

  return (
    <div>
      <h1>RESTAURANT PORTAL</h1>
      {meals.map((meal) => {
        return (
          <div key={meal.mealName}>
            <h2>
              {meal.mealName} : €{meal.price}
            </h2>
            {meal.reserved ? (
              <div>
                <p>RESERVED</p>
                <button onClick={(e) => handleCollect(e, meal.reservedBy)}>
                  Collect
                </button>
                {showCollect ? (
                  <div>
                    <p>Reserved By: {userCollect.username}</p>
                    <img
                      src={userCollect.userImage}
                      alt={userCollect.username}
                    />
                    {/* THESE BUTTONS  */}
                    <button>Collected and Paid</button>
                    <button>Release Reservation</button>
                    <button onClick={(e) => hideCollect(e)}>Cancel</button>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default RestaurantPortal;
