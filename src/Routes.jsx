import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import BoardPage from "./pages/BoardPage";

const Routes = ({ user, isGuest }) => {
  if (user || isGuest) {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/b/:boardId" component={BoardPage} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};

Routes.propTypes = {
  user: PropTypes.object,
  isGuest: PropTypes.bool.isRequired,
};

export default Routes;
