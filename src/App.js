import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Component } from "react";

import Ne from "./Components/Ne";
import Nav from "./Components/Nav";

export default class App extends Component {
  pageSize = 10;
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" key="general">
              <Ne pageSize={this.pageSize} country="us" category="general" />
            </Route>
            <Route exact path="/business" key="business">
              <Ne pageSize={this.pageSize} country="us" category="business" />
            </Route>
            <Route exact path="/entertainment" key="entertainment">
              <Ne
                pageSize={this.pageSize}
                country="us"
                category="entertainment"
              />
            </Route>
            <Route exact path="/sports" key="sports">
              <Ne pageSize={this.pageSize} country="us" category="sports" />
            </Route>
            <Route exact path="/science" key="science">
              <Ne pageSize={this.pageSize} country="us" category="science" />
            </Route>
            <Route exact path="/technology" key="technology">
              <Ne pageSize={this.pageSize} country="us" category="technology" />
            </Route>
            <Route exact path="/health" key="health">
              <Ne pageSize={this.pageSize} country="us" category="health" />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
