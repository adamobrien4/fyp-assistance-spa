import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Suggestion from "./components/Suggestion";
import Welcome from "./components/Welcome";
import StudentAssignment from "./components/StudentAssignment";
import NavBar from "./components/NavBar";

export default function App() {
  return (
    <Router>
      <div>
        <NavBar />

        <Switch>
          <Route path='/suggestion'>
            <Suggestion />
          </Route>

          <Route path='/student/assignment'>
            <StudentAssignment />
          </Route>

          <Route path='/'>
            <Welcome />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}