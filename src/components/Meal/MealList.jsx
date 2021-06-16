import React from "react";
import axios from "axios";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import { Link } from "react-router-dom";

function MealList(props) {
  const [listOfMeals, setListOfMeals] = React.useState([]);
  const [filterWord, setFilterWord] = React.useState("showall");
  const { user } = props;

  React.useEffect(() => {
    console.log("mounted");
    axios
      .get(`${CONSTS.SERVER_URL}${PATHS.ALLMEALS}`)
      .then((response) => {
        setListOfMeals(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
    return () => console.log("unmounted");
  }, []);

  function filterMeals(event, filter) {
    event.preventDefault();
    setFilterWord(filter);
  }

  return (
    <div>
      <h3>Available Meals</h3>
      <button onClick={(e) => filterMeals(e, "meat")}>Meat/Fish</button>
      <button onClick={(e) => filterMeals(e, "vegetarian")}>Vegetarian</button>
      <button onClick={(e) => filterMeals(e, "vegan")}>Vegan</button>
      <button onClick={(e) => filterMeals(e, "showall")}>Show All</button>
      {listOfMeals.map((meal) => {
        if (
          (filterWord === "showall" || meal.mealType === filterWord) &&
          !meal.reserved
        ) {
          return (
            <section key={meal._id}>
              <h4>
                <Link to={`${PATHS.SINGLEMEAL}/${meal._id}`} user={user}>
                  {meal.mealName}
                </Link>
              </h4>
            </section>
          );
        }
      })}
    </div>
  );
}

export default MealList;
