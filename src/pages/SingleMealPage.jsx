import axios from "axios";
import React from "react";
import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";
import * as MEAL_SERVICE from "../services/meal.service";
import "./SingleMeal.css";

function SingleMealPage(props) {
  const [singleMeal, setSingleMeal] = React.useState({});
  const [userOwnsMeal, setUserOwnsMeal] = React.useState(false);
  const { user } = props;

  React.useEffect(
    () => {
      axios
        .get(
          `${CONSTS.SERVER_URL}${PATHS.SINGLEMEAL}/${props.match.params.mealId}`
        )
        .then((response) => {
          setSingleMeal(response.data);
          setMealIsReserved(response.data.reserved);
          if (response.data.reservedBy) {
            if (response.data.reservedBy._id === user._id) {
              setUserOwnsMeal(true);
            }
            setIsReservedBy(response.data.reservedBy.username);
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
    mealName,
    description,
    otherInfo,
    mealType,
    price,
    reserved,
    _id,
    reservedBy,
  } = singleMeal;

  const [isReservedBy, setIsReservedBy] = React.useState(reservedBy);
  const [mealIsReserved, setMealIsReserved] = React.useState(
    reserved ? true : false
  );

  function toggleIsReserved() {
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    MEAL_SERVICE.RESERVE_MEAL(accessToken, _id).then((response) => {
      const mealIsReserved = response.data.reservedMeal.reserved;
      const mealIsReservedBy = response.data.reservedMeal.reservedBy.username;
      setMealIsReserved(mealIsReserved);
      setIsReservedBy(mealIsReserved ? mealIsReservedBy : null);
      setUserOwnsMeal(true);
    });
  }

  function toggleUnreserve() {
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    MEAL_SERVICE.UNRESERVE_MEAL(accessToken, _id).then((response) => {
      const mealIsReserved = response.data.newMeal.reserved;
      const mealIsReservedBy = null;
      setMealIsReserved(mealIsReserved);
      setIsReservedBy(mealIsReserved ? mealIsReservedBy : null);
      setUserOwnsMeal(false);
    });
  }

  return (
    <div className="SingleMeal-page">
      <h3>
        {mealName} : €{price}
      </h3>
      <p>{mealType === "meat" ? <em>meat/fish</em> : <em>{mealType}</em>}</p>
      <p>{description}</p>
      <p>
        <strong>Other information: </strong>
        {otherInfo}
      </p>
      <br />
      {!mealIsReserved ? (
        <div>
          <p>
            <strong className="available-green">AVAILABLE</strong>
          </p>
          <button onClick={toggleIsReserved} className="standardButton">
            Reserve This Meal
          </button>
        </div>
      ) : (
        <div>
          <h3 className="reserved-orange">RESERVED</h3>
          <p>
            <strong>Reserved by: </strong>
            {isReservedBy}
            <br />
            {userOwnsMeal ? (
              <button
                onClick={toggleUnreserve}
                className="standardButtonDelete"
              >
                Release Food
              </button>
            ) : null}
          </p>
        </div>
      )}
      <br />
    </div>
  );
}

export default SingleMealPage;
