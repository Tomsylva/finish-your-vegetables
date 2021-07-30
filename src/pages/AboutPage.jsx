import React from "react";
import { Link } from "react-router-dom";
import * as PATHS from "../utils/paths";
import "./AboutPage.css";

function AboutPage() {
  return (
    <div className="About-page">
      <div className="About-content">
        <div className="About-white">
          <h1>
            Welcome to FYDV! We hope you are hungry
            <span className="color-purple">.</span>
            <span className="color-orange">.</span>
            <span className="color-green">.</span>
          </h1>
          <p>
            The average American wastes roughly 0.45kg of food every single day.
            Roughly one third of the food produced in the world is wasted or
            lost. This is simply not okay.
          </p>
          <p>
            At FYDV, we aim to make a difference, albeit only a small one. We
            connect hungry people, like you, with local restaurants who have
            food that would otherwise go to waste.
          </p>
          <p>
            Basically, you get food for cheap, and restaurants will waste less
            food. It's a win/win situation!
          </p>
          <p>
            If you are a restaurant with food to offer, create an account as
            normal, and you will have the option to add your restaurant after
            signing in.
          </p>
          <p>
            We look forward to helping you to help make the world a slightly
            better place.
          </p>

          <Link to={PATHS.SIGNUPPAGE} className="authLink">
            Sign up
          </Link>
          <Link to={PATHS.HOMEPAGE} className="authLink">
            Go back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
