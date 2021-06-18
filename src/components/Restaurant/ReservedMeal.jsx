import React from "react";
import * as MEAL_SERVICE from "../../services/meal.service";
import * as CONSTS from "../../utils/consts";

function ReservedMeal(props) {
  const {
    meal,
    activeRestaurant,
    setActiveRestaurant,
    setActiveMealList,
    handleUpdateCompleted,
  } = props;

  const [showCollect, setShowCollect] = React.useState(false);
  const [userCollect, setUserCollect] = React.useState({});

  //HANDLE COLLECT
  function handleCollect(event, userId) {
    event.preventDefault();
    MEAL_SERVICE.COLLECT_MEAL(userId).then((response) => {
      setShowCollect(true);
      setUserCollect(response.data);
    });
  }

  //HIDE COLLECT
  function hideCollect(event) {
    event.preventDefault();
    setShowCollect(false);
    setUserCollect({});
  }

  //UNRESERVE MEAL
  function unreserveMeal(event, mealId) {
    event.preventDefault();
    const currentOwner = activeRestaurant.owner;
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    MEAL_SERVICE.UNRESERVE_MEAL_RESTAURANT(
      accessToken,
      currentOwner,
      mealId
    ).then((response) => {
      setShowCollect(false);
      setUserCollect({});
      console.log("RESPONSE", response);
      window.location.reload();
    });
  }

  //PICKUP MEAL
  function pickupMeal(event, mealId, customerId) {
    event.preventDefault();
    const currentOwner = activeRestaurant.owner;
    const currentRestaurant = activeRestaurant._id;
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    MEAL_SERVICE.COMPLETE_ORDER(
      accessToken,
      mealId,
      currentOwner,
      currentRestaurant,
      customerId
    ).then((response) => {
      setShowCollect(false);
      setUserCollect({});
      setActiveRestaurant(response.data.newRestaurant);
      setActiveMealList(response.data.newRestaurant.meals);
      handleUpdateCompleted(response.data.newRestaurant.completedOrders);
    });
  }

  return (
    <div>
      <h3>
        {meal.mealName} : €{meal.price}
      </h3>
      {meal.reserved ? (
        <div>
          <p>RESERVED</p>
          <button onClick={(e) => handleCollect(e, meal.reservedBy)}>
            Customer Collect
          </button>
          {showCollect ? (
            <div>
              <p>
                <strong>Reserved by: </strong>
                {userCollect.username}
              </p>
              <img src={userCollect.userImage} alt={userCollect.userName} />
              <br />
              <button onClick={(e) => pickupMeal(e, meal._id, userCollect._id)}>
                Collected and Paid
              </button>
              <button onClick={(e) => unreserveMeal(e, meal._id)}>
                Release Reservation
              </button>
              <button onClick={(e) => hideCollect(e)}>Cancel</button>
            </div>
          ) : null}
        </div>
      ) : (
        <p>AVAILABLE</p>
      )}
    </div>
  );
}

export default ReservedMeal;
