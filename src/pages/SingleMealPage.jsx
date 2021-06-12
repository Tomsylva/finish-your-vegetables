import axios from "axios";
import React from "react";
import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";
import { Link } from "react-router-dom";
import * as MEAL_SERVICE from "../services/meal.service";
// import EditMeal from "../components/Meal/EditMeal";

function SingleMealPage(props) {
  const [singleMeal, setSingleMeal] = React.useState({});
  // const { owner, user } = props;
  // console.log("owner:", owner, "user", user, "meal", singleMeal);

  React.useEffect(
    () => {
      axios
        .get(
          `${CONSTS.SERVER_URL}${PATHS.SINGLEMEAL}/${props.match.params.mealId}`
        )
        .then((response) => {
          setSingleMeal(response.data);
          console.log(response.data);
          setMealIsReserved(response.data.reserved);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const { mealName, description, otherInfo, mealType, price, reserved, _id } =
    singleMeal;

  const [mealIsReserved, setMealIsReserved] = React.useState(
    reserved ? true : false
  );

  console.log("SINGLEMEAL RESERVED:", reserved);
  console.log("MEAL IS RESERVED: ", mealIsReserved);

  function toggleIsReserved() {
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    MEAL_SERVICE.RESERVE_MEAL(accessToken, _id).then((response) => {
      console.log("RESERVE MEAL RESPONSE:", response);
      setMealIsReserved(response.data.reservedMeal.reserved);
      console.log("RESPONSE.DATA:", response.data.reservedMeal.reserved);
    });
  }

  return (
    <div>
      <h3>
        {mealName} : €{price}
      </h3>
      <p>
        <em>{mealType}</em>
      </p>
      <p>{description}</p>
      <p>
        <strong>Other information: </strong>
        {otherInfo}
      </p>
      <br />
      {!mealIsReserved ? (
        <button onClick={toggleIsReserved}>Reserve This Meal</button>
      ) : (
        <h3>RESERVED</h3>
      )}
      <br />
      {/* {owner == user._id ? (
        <EditMeal
          // currentRestaurant={currentRestaurant}
          user={user}
          singleMeal={singleMeal}
          owner={owner}
        />
      ) : null} */}

      <Link to={PATHS.AVAILABLEPAGE}>Back to available meals</Link>
    </div>
  );
}

export default SingleMealPage;
