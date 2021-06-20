import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";

function Footer(props) {
  return (
    <footer>
      <div className="footer__authLinks">
        {props.user ? (
          <>
            <Link to={PATHS.AVAILABLEPAGE} className="authLink">
              Show Food
            </Link>
            <p className="nav-breaker"> | </p>
            <Link to={PATHS.PROFILEPAGE} className="authLink">
              Profile
            </Link>
            <button className="footer-logoutbtn" onClick={props.handleLogout}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to={PATHS.SIGNUPPAGE} className="authLink">
              Sign Up
            </Link>
            <p className="nav-breaker"> | </p>
            <Link to={PATHS.LOGINPAGE} className="authLink">
              Log In
            </Link>
          </>
        )}
      </div>
    </footer>
  );
}

export default Footer;
