import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen/home_screen";
import MainScreen from "./screens/MainScreen/main_screen";
import ProfileScreen from "./screens/ProfileScreen/profile_screen";
import AdminScreen from "./screens/AdminScreen/admin_screen";
import { Provider } from "react-redux";
import store from "./redux/store";
import StoreScreen from "./screens/StoreScreen/store_screen";

function AppRouter() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/">
              <HomeScreen />
            </Route>
            <Route path="/profile">
              <ProfileScreen />
            </Route>
            <Route path="/main">
              <MainScreen />
            </Route>
            <Route path="/admin">
              <AdminScreen />
            </Route>
            <Route path="/store">
              <StoreScreen />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </>
  );
}

export default AppRouter;
