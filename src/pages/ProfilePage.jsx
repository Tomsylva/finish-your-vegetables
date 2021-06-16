import React from "react";
// import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";
import { Link } from "react-router-dom";
import UpdateProfile from "../components/Profile/UpdateProfile";
import AddRestaurant from "../components/Profile/AddRestaurant";

function ProfilePage(props) {
  const { user, authenticate, history } = props;
  const { username, userImage } = user;
  const [displayUpdateProfile, setDisplayUpdateProfile] = React.useState(false);
  const [displayAddRestaurant, setDisplayAddRestaurant] = React.useState(false);

  function profileToggle() {
    setDisplayUpdateProfile(!displayUpdateProfile);
  }

  function addRestaurantToggle() {
    setDisplayAddRestaurant(!displayAddRestaurant);
  }

  return (
    <div>
      <h1>{username}'s Profile</h1>
      <img src={userImage} alt={username} />
      <h3>Order History</h3>
      {user.history.map((order) => {
        return (
          <div key={order}>
            <p>{order}</p>
          </div>
        );
      })}

      <button onClick={profileToggle} className="ProfilePage-button">
        {displayUpdateProfile ? <p>Hide</p> : <p>Update Profile</p>}
      </button>
      <br />
      {displayUpdateProfile ? (
        <UpdateProfile
          user={user}
          authenticate={authenticate}
          history={history}
        />
      ) : null}
      <button onClick={addRestaurantToggle} className="ProfilePage-button">
        {displayAddRestaurant ? <p>Hide</p> : <p>Add Your Restaurant</p>}
      </button>
      <br />
      {displayAddRestaurant ? (
        <AddRestaurant
          user={user}
          authenticate={authenticate}
          history={history}
        />
      ) : null}
      <Link to={PATHS.AVAILABLEPAGE}>Back to available meals</Link>
    </div>
  );
}

export default ProfilePage;
