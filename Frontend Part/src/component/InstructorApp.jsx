import React, { Component } from "react";
import ListCoursesComponent from "./ListCoursesComponent";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CourseComponent from "./CourseComponent";
import StudentComponent from "./StudentComponent";
import ListStudentsComponent from "./ListStudentsComponent";

class InstructorApp extends Component {
  render() {
    return (
      <Router>
        <>
          <h1>Instructor Application</h1>
          <Switch>
            <Route path="/" exact component={ListCoursesComponent} />
            <Route path="/courses" exact component={ListCoursesComponent} />
            <Route path="/students" exact component={ListStudentsComponent} />
            <Route path="/students/:studentid" component={StudentComponent} />
            <Route path="/courses/:id" component={CourseComponent} />
            <Route path="/add/:id" exact component={ListStudentsComponent} />
            <Route
              path="/add/:id/to/:studentid"
              component={ListCoursesComponent}
            />
            <Route path="/remove/:id" exact component={ListStudentsComponent} />
            <Route
              path="/remove/:id/from/:studentid"
              component={ListCoursesComponent}
            />
          </Switch>
        </>
      </Router>
    );
  }
}

export default InstructorApp;
