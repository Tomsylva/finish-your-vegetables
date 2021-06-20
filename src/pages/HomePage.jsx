import * as PATHS from "../utils/paths";
import { Link } from "react-router-dom";
import "../App.css";
import "./Home.css";

function HomePage(props) {
  const { user, history } = props;

  if (user) {
    history.push(PATHS.AVAILABLEPAGE);
  }

  return (
    <div className="App wholePage Home">
      <div className="Home-image">
        <div className="Home-content">
          <h1 className="Home-title">Finish Your Damn Vegetables!</h1>
          <div className="Home-links">
            <Link to={PATHS.LOGINPAGE} className="authLink">
              Shut up, I'm hungry!
            </Link>
            <p className="nav-breaker hide-on-small"> | </p>
            <Link to={PATHS.ABOUTPAGE} className="authLink">
              What even is this?
            </Link>
          </div>
          <p className="reduce-padding hide-on-small">
            <strong>Not yet a member?</strong>
          </p>
          <Link
            to={PATHS.SIGNUPPAGE}
            className="authLink Home-signup hide-on-small"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
