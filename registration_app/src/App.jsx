import React from 'react';
import "./front/styles/app.css";
import LoginForm from "./front/components/LoginForm";
import UsersTable from "./front/components/UsersTable";

import { Route, Switch, Redirect } from "react-router-dom";

export default function App(props) {
  const { history } = props;

  function checkPage() {
    if (localStorage.length > 0 && localStorage.key(0) === "token") {
      return (
        <div>
          <Route history={history} path="/table" component={UsersTable} />
          <Redirect from="/" to="/table" />
        </div>
      );
    } else if (localStorage <= 0 || localStorage.key(0) !== "token") {
      return (
        <div>
          <Route history={history} path="/" component={LoginForm} />
          <Redirect from="/table" to="/" />
        </div>
      );
    }
  };

  return <div className="app">
    <Switch>
      <>{checkPage()}</>
      </Switch>
      </div>;
}
