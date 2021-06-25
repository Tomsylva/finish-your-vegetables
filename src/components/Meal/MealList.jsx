import React from "react";
import axios from "axios";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import { Link } from "react-router-dom";
import "../../pages/AvailablePage.css";
import { motion /*, useViewportScroll*/ } from "framer-motion";

function MealList(props) {
  const [listOfMeals, setListOfMeals] = React.useState([]);
  const { user, filterWord, setFilterWord } = props;

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

  const child = {
    hidden: {
      x: "+100%",
    },
    visible: {
      x: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  const ulContainer = {
    hidden: { x: "+100%" },
    visible: {
      x: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="MealList-div">
      <h3>Available Meals</h3>
      <div className="Available-filter">
        <p>Filter list</p>
        <button
          onClick={(e) => filterMeals(e, "meat")}
          className="standardButtonSmall"
        >
          Meat/Fish
        </button>
        <button
          onClick={(e) => filterMeals(e, "vegetarian")}
          className="standardButtonSmall"
        >
          Vegetarian
        </button>
        <button
          onClick={(e) => filterMeals(e, "vegan")}
          className="standardButtonSmall"
        >
          Vegan
        </button>
        <button
          onClick={(e) => filterMeals(e, "showall")}
          className="standardButtonSmall"
        >
          Show All
        </button>
      </div>
      <motion.ul variants={ulContainer} initial="hidden" animate="visible">
        {listOfMeals.map((meal) => {
          if (
            (filterWord === "showall" || meal.mealType === filterWord) &&
            !meal.reserved
          ) {
            return (
              <motion.li
                variants={child}
                style={{ listStyle: "none" }}
                className="Available-available-meal"
                key={meal._id}
              >
                <h4>
                  <Link
                    to={`${PATHS.SINGLEMEAL}/${meal._id}`}
                    user={user}
                    className="Available-available-link"
                  >
                    {meal.mealName}
                  </Link>
                </h4>
              </motion.li>
            );
          }
        })}
      </motion.ul>
    </div>
  );
}

export default MealList;
