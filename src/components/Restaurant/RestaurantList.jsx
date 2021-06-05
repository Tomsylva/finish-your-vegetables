import React from "react";
import axios from "axios";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import { Link } from "react-router-dom";

function RestaurantList() {
  const [listOfRestaurants, setListOfRestaurants] = React.useState([]);

  React.useEffect(() => {
    console.log("mounted");
    axios
      .get(`${CONSTS.SERVER_URL}${PATHS.RESTAURANT}`)
      .then((response) => {
        setListOfRestaurants(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
    return () => console.log("unmounted");
  }, []);

  return (
    <div>
      <h3>Restaurants</h3>
      {listOfRestaurants.map((restaurant) => {
        return (
          <section key={restaurant._id}>
            <Link to={`${PATHS.RESTAURANT}/${restaurant.restaurantName}`}>
              <h4>{restaurant.restaurantName}</h4>
            </Link>
          </section>
        );
      })}
    </div>
  );
}

export default RestaurantList;
