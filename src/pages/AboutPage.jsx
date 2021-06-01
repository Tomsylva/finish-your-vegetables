import React from "react";
import { Link } from "react-router-dom";
import * as PATHS from "../utils/paths";
import * as CONSTS from "../utils/consts";

function AboutPage() {
  return (
    <div>
      <h1>Welcome to EYDV! We hope you are hungry...</h1>
      <p>
        The average American wastes roughly 0.45kg of food every single day.
        Roughly one third of the food produced in the world is wasted or lost.
        This is simply not okay.
      </p>
      <p>
        At FYDV, we aim to make a difference, albeit only a small one. We
        connect hungry people, like you, with local restaurants who have food
        that would otherwise go to waste.
      </p>
      <p>
        Basically, you get food for cheap, and restaurants will waste less food.
        It's a win/win situation!
      </p>
      <p>
        We look forward to helping you to help make the world a slightly better
        place.
      </p>

      <Link to={PATHS.SIGNUPPAGE} className="authLink">
        Sign up
      </Link>
      <Link to={PATHS.HOMEPAGE} className="authLink">
        Go back
      </Link>
    </div>
  );
}

export default AboutPage;
