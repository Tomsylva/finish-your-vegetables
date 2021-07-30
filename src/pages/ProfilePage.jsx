import React from "react";
import axios from "axios";
import * as PATHS from "../utils/paths";
import * as CONSTS from "../utils/consts";
import UpdateProfile from "../components/Profile/UpdateProfile";
import AddRestaurant from "../components/Profile/AddRestaurant";
import "./ProfilePage.css";

function ProfilePage(props) {
  const { user, authenticate, history } = props;
  const { username, userImage } = user;
  const [displayUpdateProfile, setDisplayUpdateProfile] = React.useState(false);
  const [displayAddRestaurant, setDisplayAddRestaurant] = React.useState(false);
  const [populatedHistory, setPopulatedHistory] = React.useState(user);

  React.useEffect(() => {
    axios
      .get(`${CONSTS.SERVER_URL}${PATHS.PROFILEPAGE}/${user._id}/populate`)
      .then((response) => {
        setPopulatedHistory(response.data.foundUser);
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function profileToggle() {
    setDisplayUpdateProfile(!displayUpdateProfile);
  }

  function addRestaurantToggle() {
    setDisplayAddRestaurant(!displayAddRestaurant);
  }

  return (
    <div className="Profile-page">
      <h1 className="Profile-username">{username}'s Profile</h1>
      <div
        className="Profile-image-div"
        style={{ backgroundImage: "url(" + userImage + ")" }}
      ></div>

      <div className="Profile-reserved-div">
        <h3>Reserved Meals</h3>

        {populatedHistory.history.length ? (
          populatedHistory.history.map((order) => {
            return (
              <div key={order}>
                <p>
                  <strong>{order.mealName}</strong> : €{order.price}
                </p>
              </div>
            );
          })
        ) : (
          <p>You currently have no reserved meals</p>
        )}
      </div>

      <div className="Profile-completed-div">
        <h3>Completed Orders</h3>
        {populatedHistory.completedHistory.length ? (
          populatedHistory.completedHistory.map((completedOrder) => {
            return (
              <div key={completedOrder}>
                <p>
                  <strong>{completedOrder.mealName}</strong> : €
                  {completedOrder.price}
                </p>
              </div>
            );
          })
        ) : (
          <p>You have not yet completed any orders</p>
        )}
      </div>

      <button onClick={profileToggle} className="standardButton">
        {displayUpdateProfile ? <>Hide</> : <>Update Profile</>}
      </button>
      <br />
      {displayUpdateProfile ? (
        <UpdateProfile
          user={user}
          authenticate={authenticate}
          history={history}
        />
      ) : null}
      <br />
      <br />
      <p>Do you run a restaurant and want to sell your leftover food?</p>
      <button onClick={addRestaurantToggle} className="standardButton">
        {displayAddRestaurant ? <>Hide</> : <>Add Your Restaurant</>}
      </button>
      <br />
      {displayAddRestaurant ? (
        <AddRestaurant
          user={user}
          authenticate={authenticate}
          history={history}
        />
      ) : null}
    </div>
  );
}

export default ProfilePage;
