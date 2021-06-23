import React from "react";
import * as CONSTS from "../../utils/consts";
import * as MEAL_SERVICE from "../../services/meal.service";
import "../../pages/SingleRestaurant.css";

function AddMeal(props) {
  const {
    user,
    mealName = "",
    description = "",
    otherInfo = "",
    mealType = "meat",
    price = 0,
    restaurant,
  } = props;

  const [form, setForm] = React.useState({
    mealName: mealName,
    description: description,
    otherInfo: otherInfo,
    mealType: mealType,
    price: price,
  });

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    MEAL_SERVICE.ADD_MEAL(
      {
        ...form,
        userId: user._id,
        restaurant: restaurant,
      },
      accessToken
    )
      .then((response) => {
        console.log("response: ", response);
        window.location.reload(); //IS THERE A BETTER WAY TO DO THIS?
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <div className="Addmeal-div">
      <h3>Add a meal</h3>
      <form className="Addmeal-form" onSubmit={handleSubmit}>
        <div className="Addmeal-input">
          <label>Name of meal</label>
          <br />
          <input
            className="standardInput"
            name="mealName"
            value={form.mealName}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className="Addmeal-input">
          <label>Description</label>
          <br />
          <input
            className="standardInput"
            name="description"
            value={form.description}
            onChange={handleChange}
          ></input>
        </div>
        <div className="Addmeal-input">
          <label>Allergy info/other</label>
          <br />
          <input
            className="standardInput"
            name="otherInfo"
            value={form.otherInfo}
            onChange={handleChange}
          ></input>
        </div>
        <div className="Addmeal-input">
          <label>Price</label>
          <br />
          <input
            className="standardInput"
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className="Addmeal-input" id="meal-type">
          <label>Meal Type (please select)</label>
          <br />
          <select name="mealType" value={form.mealType} onChange={handleChange}>
            <option value="meat">Meat</option>
            <option value="vegan">Vegan</option>
            <option value="vegetarian">Vegetarian</option>
          </select>
        </div>
        <br />
        <button
          type="submit"
          className="RestaurantPage-button"
          className="standardButton"
        >
          Add Meal
        </button>
      </form>
    </div>
  );
}

export default AddMeal;
