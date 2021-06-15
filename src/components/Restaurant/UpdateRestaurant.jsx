import React from "react";
import * as RESTAURANT_SERVICE from "../../services/restaurant.service";
import * as CONSTS from "../../utils/consts";

function UpdateRestaurant(props) {
  const { currentRestaurant, /*user,*/ history } = props;
  //   const [restaurantImage, setRestaurantImage] = React.useState(
  //     currentRestaurant.image
  //   );
  const { restaurantName, description, otherInfo, location } =
    currentRestaurant;
  const [form, setForm] = React.useState({
    restaurantName: restaurantName,
    description: description,
    otherInfo: otherInfo,
    location: location,
  });
  const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
  //IMAGE
  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    RESTAURANT_SERVICE.UPDATE_RESTAURANT(form, accessToken, currentRestaurant)
      .then((response) => {
        if (response.data.success) {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleDelete(event) {
    event.preventDefault();
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    RESTAURANT_SERVICE.DELETE_RESTAURANT(accessToken, currentRestaurant._id)
      .then((response) => {
        if (response.data.success) {
          history.push("/");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      <form className="RestaurantPage-form" onSubmit={handleSubmit}>
        <div>
          <label>Edit {restaurantName}</label>
          <br />
          {/* <input
            name="restaurantName"
            placeholder={form.restaurantName}
            // onChange={handleChange}
            type="text"
          /> */}
        </div>
        <div>
          <label>Restaurant Description</label>
          <br />
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            type="text"
          />
        </div>
        <div>
          <label>Other Information/Covid Protection</label>
          <br />
          <input
            name="otherInfo"
            value={form.otherInfo}
            onChange={handleChange}
            type="text"
          />
        </div>
        <div>
          <label>Restaurant Location</label>
          <br />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            type="text"
          />
        </div>
        <button type="submit" className="RestaurantPage-button">
          Submit Changes
        </button>
      </form>
      <button onClick={handleDelete}>Delete This Restaurant</button>
    </div>
  );
}

export default UpdateRestaurant;
