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

  const {_id} = meal;
  console.log("MEAL ID", meal._id)

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

  function handleDelete(event, mealId) {
    event.preventDefault();
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    MEAL_SERVICE.DELETE_MEAL(accessToken, mealId, activeRestaurant._id)
      .then((response) => {
        if (response.data.success) {
          window.location.reload();
          //UPDATE STATE
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="portal-reserved-meal">
      <h4>
        {meal.mealName} : €{meal.price}
      </h4>
      {meal.reserved ? (
        <div>
          <p className="reserved-orange">RESERVED</p>
          {showCollect ? (
            <div className="collection-div">
            <button onClick={(e) => hideCollect(e)} className="standardButtonSmall">Hide info</button>
              <p>
                <strong>Reserved by: </strong>
                {userCollect.username}
              </p>
              <div
        className="Profile-image-div"
        style={{ backgroundImage: "url(" + userCollect.userImage + ")", margin: "0.5rem" }}
      ></div>
              <br />
              <button onClick={(e) => pickupMeal(e, meal._id, userCollect._id)} className="standardButtonSmall">
                Collected and Paid
              </button>
              <button onClick={(e) => unreserveMeal(e, meal._id)} className="standardButtonSmallDelete">
                Release Reservation
              </button>
            </div>
          ) : <button onClick={(e) => handleCollect(e, meal.reservedBy)} className="standardButtonSmall">
            Customer Collect
          </button>}
        </div>
      ) : (
        <p className="available-green">AVAILABLE</p>
      )}
      <button
onClick={(e) => handleDelete(e, meal._id)}
className="standardButtonSmallDelete"
>
Delete
</button>
    </div>
  );
}

export default ReservedMeal;
