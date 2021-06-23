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
    <div className="portal-completed-meal">
      <h4>{completedMeal.mealName}</h4>
      {showCustomerInfo ? (
        <div>
          <p>
            <strong>Collected by: </strong>
            {customerInfo.username}
          </p>
          <button onClick={(e) => hideInfo(e)} className="standardButtonSmall">
            Hide Customer Information
          </button>
        </div>
      ) : (
        <button onClick={(e) => showInfo(e, completedMeal.reservedBy)} className="standardButtonSmall">
          Order Information
        </button>
      )}
    </div>
  );
}

export default CompletedMeal;
