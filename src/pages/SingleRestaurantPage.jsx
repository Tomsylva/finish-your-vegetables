import React, { useEffect, useState } from "react";
import axios from "axios";
import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";
import { Link } from "react-router-dom";
import LoadingComponent from "../components/Loading";
import UpdateRestaurant from "../components/Restaurant/UpdateRestaurant";
import RestaurantPortal from "../components/Restaurant/RestaurantPortal";
import "./SingleRestaurant.css";

function SingleRestaurantPage(props) {
  const { history, user } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [singleRestaurant, setSingleRestaurant] = useState({});
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
    meals,
    owner,
    image,
  } = singleRestaurant;

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className="Restaurant-page">
      <div
        className="Restaurant-cover"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <h1 id="Restaurant-name">{restaurantName}</h1>
      </div>
      <div className="Restaurant-content">
        <p className="Restaurant-description">{description}</p>
        <br />
        {owner === user._id ? (
          <div>
            <RestaurantPortal restaurant={singleRestaurant} user={user} />
            <button onClick={editRestaurantToggle} className="standardButton">
              {displayEditRestaurant ? <>Hide</> : <>Edit Restaurant </>}
            </button>
            {displayEditRestaurant ? (
              <UpdateRestaurant
                currentRestaurant={singleRestaurant}
                user={user}
                history={history}
              />
            ) : null}
          </div>
        ) : (
          <div className="Restaurant-sections">
            <div className="Restaurant-left">
              <p>
                <strong>Location: </strong>
                {location}
              </p>
              <p>
                <strong>Contact: </strong>
                {contact}
              </p>
              <p>
                <strong></strong>
                {otherInfo}
              </p>
            </div>
            <div className="Restaurant-right">
              <h3>Available Food</h3>
              {meals.map((meal) => {
                return (
                  <div key={meal._id} className="Restaurant-active-meal">
                    <Link
                      to={`${PATHS.SINGLEMEAL}/${meal._id}`}
                      owner={owner}
                      user={user}
                      style={{ textDecoration: "none" }}
                    >
                      <p className="standardLink">
                        {meal.mealName} : €{meal.price}
                      </p>
                    </Link>
                    {meal.reserved ? (
                      <p className="reserved-orange">RESERVED</p>
                    ) : null}
                    <br />
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <br />
      </div>
    </div>
  );
}

export default SingleRestaurantPage;
