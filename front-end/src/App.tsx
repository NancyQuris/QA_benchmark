import React from 'react';
import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default function App() {
  return (
    <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/register">
            <RegisterPage />
          </Route>
          {/* <Route path="/annotate/:user_id">
            <AnnotationPage/>
          </Route> */}
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
    </Router>
  );
}

