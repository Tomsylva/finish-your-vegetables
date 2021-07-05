import * as PATHS from "../utils/paths";
import { Link } from "react-router-dom";
import "../App.css";
import "./Home.css";
import { motion } from "framer-motion";

function HomePage(props) {
  const { user, history } = props;

  if (user) {
    history.push(PATHS.AVAILABLEPAGE);
  }

  return (
    <div className="App wholePage Home">
      <div className="Home-image">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
            transition: {
              delay: 0.1,
            },
          }}
        >
          <div className="Home-content">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {
                  scale: 0.8,
                  opacity: 0,
                },
                visible: {
                  scale: 1,
                  opacity: 1,
                  transition: {
                    delay: 0.2,
                  },
                },
              }}
            >
              <h1 className="Home-title">Finish Your Damn Vegetables!</h1>
            </motion.div>
            <div className="Home-links">
              <Link to={PATHS.LOGINPAGE} className="authLink">
                Shut up, I'm hungry!
              </Link>
              <p className="nav-breaker hide-on-small"> | </p>
              <Link to={PATHS.ABOUTPAGE} className="authLink">
                What the hell is this?
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
          <br />
          <p style={{ color: "#1f063d", padding: "2rem" }}>
            Note: this is portfolio project, not an actual food ordering app.
            Thanks for popping by - Tom :)
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default HomePage;
