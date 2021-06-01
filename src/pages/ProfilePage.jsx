import React from "react";
// import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";
import { Link } from "react-router-dom";

function ProfilePage(props) {
  const { user } = props;
  const { userName } = user;

  return (
    <div>
      <h1>{userName}'s Profile</h1>

      {/* <Link to={PATHS.CREATERESTAURANT}>Add your restaurant</Link> */}
      <Link to={PATHS.AVAILABLEPAGE}>Back to available meals</Link>
    </div>
  );
}

export default ProfilePage;
