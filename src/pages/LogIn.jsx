import React, { useState } from "react";
import { login } from "../services/auth";
import "./Signup";
import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";
import "./LogIn.css";

export default function LogIn({ authenticate, history }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const { username, password } = form;
  const [error, setError] = useState(null);

  function handleInputChange(event) {
    const { name, value } = event.target;

    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();

    const credentials = {
      username,
      password,
    };
    login(credentials).then((res) => {
      if (!res.status) {
        return setError({ message: "Invalid credentials" });
      }
      localStorage.setItem(CONSTS.ACCESS_TOKEN, res.data.accessToken);
      authenticate(res.data.user);
      history.push(PATHS.AVAILABLEPAGE);
    });
  }

  return (
    <div className="Login-page">
      <h1 className="standardTitle">Log In</h1>
      <form onSubmit={handleFormSubmission} className="signup__form">
        <div className="Login-input-div">
          <label htmlFor="input-username">User Name</label>
          <br />
          <br />
          <input
            id="input-username"
            type="text"
            name="username"
            placeholder="User Name"
            value={username}
            onChange={handleInputChange}
            required
            className="standardInput"
          />
        </div>
        <br />
        <div className="Login-input-div">
          <label htmlFor="input-password">Password</label>
          <br />
          <br />
          <input
            id="input-password"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange}
            required
            minLength="8"
            className="standardInput"
          />
        </div>
        {error && (
          <div className="error-block">
            <p>There was an error submiting the form:</p>
            <p>{error.message}</p>
          </div>
        )}
        <br />
        <button className="button__submit standardButton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
