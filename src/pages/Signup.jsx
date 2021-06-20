import React, { useState } from "react";
import { signup } from "../services/auth";
import "./auth.css";
import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";
import "./Signup.css";

export default function Signup({ authenticate, history }) {
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
    signup(credentials).then((res) => {
      if (!res.status) {
        // unsuccessful signup
        console.error("Signup was unsuccessful: ", res);
        return setError({
          message: "Signup was unsuccessful! Please check the console.",
        });
      }
      // successful signup
      localStorage.setItem(CONSTS.ACCESS_TOKEN, res.data.accessToken);
      authenticate(res.data.user);
      history.push(PATHS.HOMEPAGE);
    });
  }

  return (
    <div className="Signup-page">
      <h1 className="standardTitle">Sign Up</h1>
      <form onSubmit={handleFormSubmission} className="auth__form">
        <label htmlFor="input-username">User Name</label>
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
        <br />
        <label htmlFor="input-password">Password</label>
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
        <br />
        {error && (
          <div className="error-block">
            <p>There was an error submiting the form:</p>
            <p>{error.message}</p>
          </div>
        )}

        <button className="button__submit standardButton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
