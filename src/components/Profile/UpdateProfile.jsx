import React from "react";
import * as PROFILE_SERVICE from "../../services/profile.service.js";
import * as CONSTS from "../../utils/consts";

function UpdateProfile(props) {
  const { user, history } = props;
  const { username } = user;
  const [userImage, setUserImage] = React.useState(user.userImage);
  const [form, setForm] = React.useState({
    username: username,
  });

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleImageInput(event) {
    const image = event.target.files[0];
    setUserImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formBody = new FormData();
    formBody.append("userImage", userImage);
    formBody.append("username", username);
    formBody.append("userId", user._id);
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

    PROFILE_SERVICE.UPDATE_PROFILE(formBody, accessToken)
      .then((response) => {
        props.authenticate(response.data.user);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleDelete(event) {
    event.preventDefault();
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    PROFILE_SERVICE.DELETE_PROFILE(accessToken)
      .then((response) => {
        console.log(response);

        if (response.data.success) {
          localStorage.removeItem("access_token");
          history.push("/");
        }

        props.authenticate(response.data.user);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      <form className="ProfilePage-form" onSubmit={handleSubmit}>
        <div className="update-profile-div">
          <label>User Name</label>
          <br />
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className="standardInput"
          ></input>
          <br />
          <br />
          <label>Profile Picture</label>
          <div class="file-input">
            <input type="file" onChange={handleImageInput} />
          </div>
        </div>
        <button type="submit" className="ProfilePage-button standardButton">
          Submit Changes
        </button>
      </form>

      <button onClick={handleDelete} className="standardButtonDelete">
        Delete Profile
      </button>
    </div>
  );
}

export default UpdateProfile;
