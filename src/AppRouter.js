import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen/home_screen";
import MainScreen from "./screens/MainScreen/main_screen";
import ProfileScreen from "./screens/ProfileScreen/profile_screen";
import DetailScreen from "./screens/DetailScreen/detail_screen";

function AppRouter() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomeScreen />
          </Route>
          <Route exact path="/profile">
            <ProfileScreen />
          </Route>
          <Route exact path="/main">
            <MainScreen />
          </Route>
          <Route path="/detail/:id">
            <DetailScreen />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default AppRouter;
