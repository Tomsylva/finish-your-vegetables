import React from "react";
// import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";
import { Link } from "react-router-dom";
import UpdateProfile from "../components/Profile/UpdateProfile";
import AddRestaurant from "../components/Profile/AddRestaurant";

function ProfilePage(props) {
  const { user, authenticate, history } = props;
  const { username } = user;
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

      <button onClick={profileToggle} className="ProfilePage-button">
        Update Profile
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
        Add Your Restaurant
      </button>
      <br />
      {displayAddRestaurant ? (
        <AddRestaurant
          user={user}
          authenticate={authenticate}
          history={history}
        />
      ) : null}

      {/* <Link to={PATHS.CREATERESTAURANT}>Add your restaurant</Link> */}
      <Link to={PATHS.AVAILABLEPAGE}>Back to available meals</Link>
      {/* <Link to={PATHS.DELETE_PROFILE}>Delete Profile</Link> */}
    </div>
  );
}

export default ProfilePage;
