import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import FlightList from "./FlightList";
import FlightSearch from "./FlightSearch";
import SuccessPage from "./SuccessPage";
import ErrorPage from "./ErrorPage";
import Header from "./Header";

import history from './history';

export default class Routes extends Component {

  render() {
    return (
      <>
        <Router history={history}>
          <Switch>
            <Route path="/" exact>
              <Header />
              <FlightSearch />
            </Route>
            <Route path="/flightList">
              <Header />
              <FlightList />
            </Route>
            <Route path="/successPage">
              <Header />
              <SuccessPage />
            </Route>
            <Route path="/errorPage">
              <Header />
              <ErrorPage />
            </Route>
          </Switch>
        </Router>
      </>
    )
  }
}