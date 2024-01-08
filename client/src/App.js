import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in on component mount
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleSignup = () => {
    // You may add additional logic if needed
  };
  
  const handleLogout = () => {
    // Clear user data on logout
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    setLoggedIn(false);
  };

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>

        <Route path="/login">
          {loggedIn ? <Redirect to="/dashboard" /> : <Login onLogin={handleLogin} />}
        </Route>

        <Route path="/signup">
          {loggedIn ? <Redirect to="/dashboard" /> : <SignUp onSignup={handleSignup} />}
        </Route>

        <Route path="/dashboard">
          {loggedIn ? <Dashboard onLogout={handleLogout} /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
