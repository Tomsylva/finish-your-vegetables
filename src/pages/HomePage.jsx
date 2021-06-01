import * as PATHS from "../utils/paths";
// import * as CONSTS from "../utils/consts";
import { Link } from "react-router-dom";
import "../App.css";
import "./Home.css";

function HomePage() {
  return (
    <div className="App">
      <h1>Finish Your Damn Vegetables!</h1>
      <Link to={PATHS.LOGINPAGE} className="authLink">
        I'm hungry!
      </Link>
      <Link to={PATHS.ABOUTPAGE} className="regularLink">
        What even is this?
      </Link>
      <p>Not yet a member?</p>
      <Link to={PATHS.SIGNUPPAGE} className="authLink">
        Sign up
      </Link>
    </div>
  );
}

export default HomePage;
