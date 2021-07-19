import React from 'react';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { createContext } from 'react';
import { useState } from 'react';
import Destination from './components/Destination/Destination';
export const UserContext = createContext();

const App = () => {
  const [signedInUser, setSignedInUser] = useState({});
  return (
    <UserContext.Provider value={[signedInUser, setSignedInUser]}>
      <Router>
        <Header />
        <Switch>
        </Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/destination">
          <Destination />
        </PrivateRoute>
      </Router>
    </UserContext.Provider>
  );
};

export default App;