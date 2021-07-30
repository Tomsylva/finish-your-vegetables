import React from "react";
import { Route } from "react-router-dom";

const NormalRoute = ({ exact, path, component, ...componentProps }) => {
  const Component = component;
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => <Component {...componentProps} {...props} />}
    />
  );
};

export default NormalRoute;
