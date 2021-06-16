import React, { useEffect, useState } from "react";
import axios from "axios";
import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";
import { Link } from "react-router-dom";
import AddMeal from "../components/Restaurant/AddMeal";
import LoadingComponent from "../components/Loading";
import UpdateRestaurant from "../components/Restaurant/UpdateRestaurant";
import * as MEAL_SERVICE from "../services/meal.service";
import RestaurantPortal from "../components/Restaurant/RestaurantPortal";

function SingleRestaurantPage(props) {
  const { history, user } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [singleRestaurant, setSingleRestaurant] = useState({});
  const [displayAddMeal, setDisplayAddMeal] = useState(false);
  const [displayEditRestaurant, setDisplayEditRestaurant] = useState(false);

  function editRestaurantToggle() {
    setDisplayEditRestaurant(!displayEditRestaurant);
  }

  useEffect(
    () => {
      axios
        .get(
          `${CONSTS.SERVER_URL}${PATHS.RESTAURANT}/${props.match.params.restaurantName}`
        )
        .then((response) => {
          setSingleRestaurant(response.data);
          setIsLoading(false);
          if (response.data.owner === user._id) {
            setDisplayAddMeal(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const {
    restaurantName,
    description,
    location,
    contact,
    otherInfo,
    _id,
    meals,
    owner,
  } = singleRestaurant;

  console.log(singleRestaurant);

  if (isLoading) {
    return <LoadingComponent />;
  }

  function handleDelete(event, mealId) {
    event.preventDefault();
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    MEAL_SERVICE.DELETE_MEAL(accessToken, mealId, _id)
      .then((response) => {
        console.log("RESTAURANT RESPONSE:", response);
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
    <div>
      <h2>{restaurantName}</h2>
      <p>{description}</p>
      <p>
        <strong>Location: </strong>
        {location}
      </p>
      <p>
        <strong>Contact: </strong>
        {contact}
      </p>
      <p>
        <strong>Other Information: </strong>
        {otherInfo}
      </p>
      <h3>Available Food</h3>
      {meals.map((meal) => {
        return (
          <div key={meal._id}>
            <Link
              to={`${PATHS.SINGLEMEAL}/${meal._id}`}
              owner={owner}
              user={user}
            >
              {meal.mealName}
            </Link>
            {meal.reserved ? <p>RESERVED</p> : null}
            <br />
            {owner === user._id ? (
              <button onClick={(e) => handleDelete(e, meal._id)}>
                Delete {meal.name}
              </button>
            ) : null}
          </div>
        );
      })}
      {displayAddMeal ? <AddMeal restaurant={_id} user={user} /> : null}
      <br />
      {owner === user._id ? (
        <button
          onClick={editRestaurantToggle}
          className="RestaurantPage-button"
        >
          {displayEditRestaurant ? <p>Hide</p> : <p>Edit Restaurant</p>}
        </button>
      ) : null}
      <br />
      {displayEditRestaurant ? (
        <UpdateRestaurant
          currentRestaurant={singleRestaurant}
          user={user}
          history={history}
        />
      ) : null}
      <Link to={PATHS.AVAILABLEPAGE}>Back to available meals</Link>
      <RestaurantPortal restaurant={singleRestaurant} />
    </div>
  );
}

export default SingleRestaurantPage;
