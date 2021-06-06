import React, { useEffect, useState } from "react";
import axios from "axios";
import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";
import { Link } from "react-router-dom";
import AddMeal from "../components/Restaurant/AddMeal";
import LoadingComponent from "../components/Loading";

function SingleRestaurantPage(props) {
  const { history, user } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [singleRestaurant, setSingleRestaurant] = useState({});
  const [displayAddMeal, setDisplayAddMeal] = useState(false);

  useEffect(() => {
    axios
      .get(
        `${CONSTS.SERVER_URL}${PATHS.RESTAURANT}/${props.match.params.restaurantName}`
      )
      .then((response) => {
        setSingleRestaurant(response.data);
        setIsLoading(false);
        if (response.data.owner == user._id) {
          setDisplayAddMeal(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const {
    restaurantName,
    description,
    location,
    contact,
    otherInfo,
    _id,
    meals,
  } = singleRestaurant;

  if (isLoading) {
    return <LoadingComponent />;
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
            <Link to={`${PATHS.SINGLEMEAL}/${meal._id}`}>{meal.mealName}</Link>
          </div>
        );
      })}
      {displayAddMeal ? (
        <AddMeal restaurant={_id} history={history} user={user} />
      ) : null}
      <br />
      <Link to={PATHS.AVAILABLEPAGE}>Back to available meals</Link>
    </div>
  );
}

export default SingleRestaurantPage;
