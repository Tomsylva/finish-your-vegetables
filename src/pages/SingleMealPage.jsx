import axios from "axios";
import React from "react";
import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";
import { Link } from "react-router-dom";

function SingleMealPage(props) {
  // const {user} = props;
  const [singleMeal, setSingleMeal] = React.useState({});

  React.useEffect(() => {
    axios
      .get(
        `${CONSTS.SERVER_URL}${PATHS.SINGLEMEAL}/${props.match.params.mealId}`
      )
      .then((response) => {
        setSingleMeal(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const { mealName, description, otherInfo, mealType, price } = singleMeal;

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
      <Link to={PATHS.AVAILABLEPAGE}>Back to available meals</Link>
    </div>
  );
}

export default SingleMealPage;
