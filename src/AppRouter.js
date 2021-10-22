import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen/home_screen";
import MainScreen from "./screens/MainScreen/main_screen";
import ProfileScreen from "./screens/ProfileScreen/profile_screen";
import { Provider } from "react-redux";
import store from "./redux/store";

function AppRouter() {
  return (
    <>
    <Provider store={store}>
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
        </Switch>
      </Router>
      </Provider>
    </>
  );
}

export default AppRouter;
