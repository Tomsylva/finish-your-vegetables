import React from "react";
import * as MEAL_SERVICE from "../../services/meal.service";

function CompletedMeal(props) {
  const { completedMeal } = props;
  const [showCustomerInfo, setShowCustomerInfo] = React.useState(false);
  const [customerInfo, setCustomerInfo] = React.useState({});

  function showInfo(event, userId) {
    event.preventDefault();
    MEAL_SERVICE.SHOW_INFO(userId).then((response) => {
      setShowCustomerInfo(true);
      setCustomerInfo(response.data);
    });
  }

  function hideInfo(event) {
    event.preventDefault();
    setShowCustomerInfo(false);
    setCustomerInfo({});
  }

  return (
    <div>
      <h3>{completedMeal.mealName}</h3>
      {showCustomerInfo ? (
        <div>
          <p>
            <strong>Collected by: </strong>
            {customerInfo.username}
          </p>
          <button onClick={(e) => hideInfo(e)}>
            Hide Customer Information
          </button>
        </div>
      ) : (
        <button onClick={(e) => showInfo(e, completedMeal.reservedBy)}>
          Show Order Information
        </button>
      )}
    </div>
  );
}

export default CompletedMeal;
