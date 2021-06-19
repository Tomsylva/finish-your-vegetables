import React from "react";
import * as CONSTS from "../../utils/consts";
import * as RESTAURANT_SERVICE from "../../services/restaurant.service.js";
import * as PATHS from "../../utils/paths";
import { OpenStreetMapProvider } from "leaflet-geosearch";

function AddRestaurant(props) {
  const provider = new OpenStreetMapProvider();

  const {
    user,
    restaurantName = "",
    description = "",
    location = "",
    otherInfo = "",
    contact = "",
    history,
  } = props;

  const [form, setForm] = React.useState({
    restaurantName: restaurantName,
    description: description,
    location: location,
    otherInfo: otherInfo,
    contact: contact,
  });

  const [errorMessage, setErrorMessage] = React.useState("");

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    provider.search({ query: form.location }).then((response) => {
      if (!response.length) {
        setErrorMessage("Please check your location");
        return;
      }
      const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
      RESTAURANT_SERVICE.ADD_RESTAURANT(
        { ...form, userId: user._id },
        accessToken
      )
        .then(() => {
          history.push(PATHS.AVAILABLEPAGE);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }

  return (
    <div>
      {errorMessage ? <p>{errorMessage}</p> : null}
      <p>Please fill in all the fields below</p>
      <form className="ProfilePage-form" onSubmit={handleSubmit}>
        <div>
          <label>Restaurant Name</label>
          <br />
          <input
            name="restaurantName"
            value={form.restaurantName}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div>
          <label>Restaurant Description</label>
          <br />
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div>
          <label>Restaurant Location</label>
          <br />
          <p>Please use the following format:</p>
          <p>Street name & number, Nürnberg, Postcode</p>
          <p>
            <strong>eg.</strong> Paumgartnerstraße 20, Nürnberg, 90429
          </p>
          <br />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div>
          <label>Other Info/Covid Precautions</label>
          <br />
          <input
            name="otherInfo"
            value={form.otherInfo}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label>Contact Information</label>
          <br />
          <input
            name="contact"
            value={form.contact}
            onChange={handleChange}
            required
          ></input>
        </div>
        <button type="submit" className="ProfilePage-button">
          Add Restaurant
        </button>
      </form>
      <br />
    </div>
  );
}

export default AddRestaurant;
