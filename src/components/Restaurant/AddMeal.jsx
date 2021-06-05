import React from "react";
import * as CONSTS from "../../utils/consts";
import * as MEAL_SERVICE from "../../services/meal.service";
import * as PATHS from "../../utils/paths";

function AddMeal(props) {
  const {
    user,
    mealName,
    description,
    otherInfo,
    mealType,
    price,
    history,
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
        console.log(response);
        history.push(PATHS.AVAILABLEPAGE); //CHANGE LATER
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <div>
      <p>Please fill in the fields below</p>
      <form className="RestaurantPage-form" onSubmit={handleSubmit}>
        <div>
          <label>Name of meal</label>
          <br />
          <input
            name="mealName"
            value={form.mealName}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div>
          <label>Description</label>
          <br />
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label>Other Info/Allergy Info</label>
          <br />
          <input
            name="otherInfo"
            value={form.otherInfo}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label>Meal Type (please select)</label>
          <br />
          <select name="mealType" value={form.mealType} onChange={handleChange}>
            <option value="meat">Meat</option>
            <option value="vegan">Vegan</option>
            <option value="vegetarian">Vegetarian</option>
          </select>
        </div>
        <div>
          <label>Price</label>
          <br />
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          ></input>
        </div>
        <br />
        <button type="submit" className="RestaurantPage-button">
          Add Meal
        </button>
      </form>
    </div>
  );
}

export default AddMeal;
