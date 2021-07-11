import React from "react";
import * as RESTAURANT_SERVICE from "../../services/restaurant.service";
import * as CONSTS from "../../utils/consts";

function UpdateRestaurant(props) {
  const { currentRestaurant, history } = props;
  const [restaurantImage, setRestaurantImage] = React.useState(
    currentRestaurant.image
  );
  const [errorMessage, setErrorMessage] = React.useState("");

  const { restaurantName, description, otherInfo, location } =
    currentRestaurant;
  const [form, setForm] = React.useState({
    restaurantName: restaurantName,
    description: description,
    otherInfo: otherInfo,
    location: location,
  });
  const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    RESTAURANT_SERVICE.UPDATE_RESTAURANT(form, accessToken, currentRestaurant)
      .then((response) => {
        if (response.data.success) {
          console.log("RESPONSE DATA:", response.data);
          window.location.reload();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleImageInput(event) {
    const image = event.target.files[0];
    setRestaurantImage(image);
  }

  function handleImage(event) {
    event.preventDefault();
    if (!restaurantImage) {
      setErrorMessage("Please input a valid image");
      return;
    }
    const formBody = new FormData();
    formBody.append("image", restaurantImage);
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    const restaurantId = currentRestaurant._id;

    RESTAURANT_SERVICE.UPDATE_IMAGE(formBody, accessToken, restaurantId)
      .then((response) => {
        setRestaurantImage(response.data.updatedRestaurant.image);
        window.location.reload();
        //UPDATE STATE
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
    <div className="UpdateRestaurant-page">
      <form className="RestaurantPage-form" onSubmit={handleSubmit}>
        <div>
          <h3>Edit {restaurantName}</h3>
          <br />
        </div>
        <div>
          <label>Restaurant Description</label>
          <br />
          <br />
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            type="text"
            className="standardInput"
          />
        </div>
        <div>
          <label>Other Information/Covid Protection</label>
          <br />
          <br />
          <input
            name="otherInfo"
            value={form.otherInfo}
            onChange={handleChange}
            type="text"
            className="standardInput"
          />
        </div>
        <div>
          <label>Restaurant Location</label>
          <br />
          <br />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            type="text"
            className="standardInput"
          />
        </div>
        <br />
        <button type="submit" className="standardButton">
          Submit Changes
        </button>
        <p style={{ fontSize: "3rem" }}>
          <strong>
            <span className="color-purple">.</span>
            <span className="color-orange">.</span>
            <span className="color-green">.</span>
          </strong>
        </p>
      </form>
      <form onSubmit={handleImage} className="RestaurantPage-form">
        <div>
          {errorMessage ? <p>{errorMessage}</p> : null}
          <input type="file" name="image" onChange={handleImageInput} />
          <button type="submit" className="standardButton">
            Upload Image
          </button>
        </div>
      </form>
      <p style={{ fontSize: "3rem" }}>
        <strong>
          <span className="color-purple">.</span>
          <span className="color-orange">.</span>
          <span className="color-green">.</span>
        </strong>
      </p>
      <button onClick={handleDelete} className="standardButtonDelete">
        Delete This Restaurant
      </button>
    </div>
  );
}

export default UpdateRestaurant;
