import React from "react";
import axios from "axios";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer } from "react-leaflet";
import RestaurantMarker from "./RestaurantMarker";
import "../../pages/AvailablePage.css";

function RestaurantList(props) {
  const [listOfRestaurants, setListOfRestaurants] = React.useState([]);
  const { filterWord, user } = props;

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
    <div className="Restaurant-list-div">
      <MapContainer
        center={[49.452, 11.076]}
        zoom={13}
        scrollWheelZoom={false}
        id="MapContainer"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {listOfRestaurants.map((restaurant) => {
          const filteredRestaurant = restaurant.meals.filter(
            (meal) => meal.mealType === filterWord
          );
          if (filteredRestaurant.length || filterWord === "showall") {
            return <RestaurantMarker restaurant={restaurant} />;
          }
        })}
      </MapContainer>
      {listOfRestaurants.map((restaurant) => {
        if (restaurant.owner === user._id) {
          return (
            <section key={restaurant._id}>
              <Link
                to={`${PATHS.RESTAURANT}/${restaurant.restaurantName}`}
                className="Available-restaurant-link"
              >
                <h4 className="restaurant-item">
                  {restaurant.restaurantName} Portal
                </h4>
              </Link>
            </section>
          );
        }
      })}
    </div>
  );
}

export default RestaurantList;
