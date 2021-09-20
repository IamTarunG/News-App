import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import LoadingBar from "react-top-loading-bar";
import Ne from "./Components/Ne";
import Nav from "./Components/Nav";

export default class App extends Component {
  pageSize = 10;
  state = {
    progress: 0,
  };

  setProgress = (progress) => {
    this.setState({
      progress: progress,
    });
  };

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <LoadingBar
            height={3}
            color="#f11946"
            progress={this.state.progress}
          />
          <Switch>
            <Route exact path="/" key="general">
              <Ne
                setProgress={this.setProgress}
                pageSize={this.pageSize}
                country="us"
                category="general"
              />
            </Route>
            <Route exact path="/business" key="business">
              <Ne
                setProgress={this.setProgress}
                pageSize={this.pageSize}
                country="us"
                category="business"
              />
            </Route>
            <Route exact path="/entertainment" key="entertainment">
              <Ne
                setProgress={this.setProgress}
                pageSize={this.pageSize}
                country="us"
                category="entertainment"
              />
            </Route>
            <Route exact path="/sports" key="sports">
              <Ne
                setProgress={this.setProgress}
                pageSize={this.pageSize}
                country="us"
                category="sports"
              />
            </Route>
            <Route exact path="/science" key="science">
              <Ne
                setProgress={this.setProgress}
                pageSize={this.pageSize}
                country="us"
                category="science"
              />
            </Route>
            <Route exact path="/technology" key="technology">
              <Ne
                setProgress={this.setProgress}
                pageSize={this.pageSize}
                country="us"
                category="technology"
              />
            </Route>
            <Route exact path="/health" key="health">
              <Ne
                setProgress={this.setProgress}
                pageSize={this.pageSize}
                country="us"
                category="health"
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
