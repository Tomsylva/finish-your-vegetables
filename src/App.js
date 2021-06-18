import React, { useEffect, useState } from "react";
import { Switch } from "react-router-dom";
import LoadingComponent from "./components/Loading";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import LogIn from "./pages/LogIn";
// import ProtectedPage from "./pages/ProtectedPage";
import Signup from "./pages/Signup";
import NormalRoute from "./routing-components/NormalRoute";
import ProtectedRoute from "./routing-components/ProtectedRoute";
import { getLoggedIn, logout } from "./services/auth";
import * as PATHS from "./utils/paths";
import * as CONSTS from "./utils/consts";
import AvailablePage from "./pages/AvailablePage";
import SingleRestaurantPage from "./pages/SingleRestaurantPage";
import SingleMealPage from "./pages/SingleMealPage";
// import { MapContainer } from "react-leaflet";
// import { Icon } from "leaflet";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    if (!accessToken) {
      return setIsLoading(false);
    }
    getLoggedIn(accessToken).then((res) => {
      if (!res.status) {
        return setIsLoading(false);
      }
      setUser(res.data.user);
      setIsLoading(false);
    });
  }, []);

  function handleLogout() {
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    if (!accessToken) {
      setUser(null);
      return setIsLoading(false);
    }
    setIsLoading(true);
    logout(accessToken).then((res) => {
      if (!res.status) {
        // deal with error here
        console.error("Logout was unsuccessful: ", res);
      }
      localStorage.removeItem(CONSTS.ACCESS_TOKEN);
      setIsLoading(false);
      return setUser(null);
    });
  }

  function authenticate(user) {
    setUser(user);
  }

  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <div className="App">
      <Navbar handleLogout={handleLogout} user={user} />
      {/* <MapContainer></MapContainer> */}
      <Switch>
        <NormalRoute
          exact
          path={PATHS.HOMEPAGE}
          component={HomePage}
          user={user}
        ></NormalRoute>
        <NormalRoute
          exact
          path={PATHS.SIGNUPPAGE}
          authenticate={authenticate}
          component={Signup}
        />
        <NormalRoute
          exact
          path={PATHS.LOGINPAGE}
          authenticate={authenticate}
          component={LogIn}
        />
        <NormalRoute exact path={PATHS.ABOUTPAGE} component={AboutPage} />
        <ProtectedRoute
          exact
          path={PATHS.AVAILABLEPAGE}
          component={AvailablePage}
          user={user}
        />
        <ProtectedRoute
          exact
          path={PATHS.PROFILEPAGE}
          component={ProfilePage}
          user={user}
          authenticate={authenticate}
        />
        <ProtectedRoute
          exact
          path={`${PATHS.RESTAURANT}/:restaurantName`}
          user={user}
          component={SingleRestaurantPage}
        />
        <ProtectedRoute
          exact
          path={`${PATHS.SINGLEMEAL}/:mealId`}
          user={user}
          component={SingleMealPage}
        />
      </Switch>
    </div>
  );
}
