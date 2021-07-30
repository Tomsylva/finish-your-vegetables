import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";

const Navbar = (props) => {
  return (
    <nav>
      <Link to={PATHS.HOMEPAGE} className="nav__projectName authLink">
        Finish Your Damn Vegetables
      </Link>

      <div className="nav__authLinks">
        {props.user ? (
          <>
            <Link to={PATHS.AVAILABLEPAGE} className="authLink">
              Show Food
            </Link>
            <p className="nav-breaker"> | </p>
            <Link to={PATHS.PROFILEPAGE} className="authLink">
              Profile
            </Link>
            <button className="nav-logoutbtn" onClick={props.handleLogout}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to={PATHS.SIGNUPPAGE} className="authLink">
              Sign Up
            </Link>
            <Link to={PATHS.LOGINPAGE} className="authLink">
              Log In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
