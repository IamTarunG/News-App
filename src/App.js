import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState } from "react";
import LoadingBar from "react-top-loading-bar";
import Ne from "./Components/Ne";
import Nav from "./Components/Nav";
export default function App() {
  const [progress, setprogress] = useState(0);
  let pageSize = 10;

  const setProgress = (progress) => {
    setprogress(progress);
  };

  return (
    <Router>
      <div>
        <Nav />
        <LoadingBar height={3} color="#f11946" progress={progress} />
        <Switch>
          <Route exact path="/" key="general">
            <Ne
              setProgress={setProgress}
              pageSize={pageSize}
              country="in"
              category="general"
            />
          </Route>
          <Route exact path="/business" key="business">
            <Ne
              setProgress={setProgress}
              pageSize={pageSize}
              country="in"
              category="business"
            />
          </Route>
          <Route exact path="/entertainment" key="entertainment">
            <Ne
              setProgress={setProgress}
              pageSize={pageSize}
              country="in"
              category="entertainment"
            />
          </Route>
          <Route exact path="/sports" key="sports">
            <Ne
              setProgress={setProgress}
              pageSize={pageSize}
              country="in"
              category="sports"
            />
          </Route>
          <Route exact path="/science" key="science">
            <Ne
              setProgress={setProgress}
              pageSize={pageSize}
              country="in"
              category="science"
            />
          </Route>
          <Route exact path="/technology" key="technology">
            <Ne
              setProgress={setProgress}
              pageSize={pageSize}
              country="in"
              category="technology"
            />
          </Route>
          <Route exact path="/health" key="health">
            <Ne
              setProgress={setProgress}
              pageSize={pageSize}
              country="in"
              category="health"
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
