import React, { Component } from "react";
import DataService from "../service/DataService";

const INSTRUCTOR = "in28minutes";

class ListCoursesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      message: null
    };
    this.refreshCourses = this.refreshCourses.bind(this);
    this.deleteCourseClicked = this.deleteCourseClicked.bind(this);
    this.updateCourseClicked = this.updateCourseClicked.bind(this);
    this.addCourseClicked = this.addCourseClicked.bind(this);
    this.addStudentClicked = this.addStudentClicked.bind(this);
    this.viewCoursesClicked = this.viewCoursesClicked.bind(this);
    this.addStudentToCourseClicked = this.addStudentToCourseClicked.bind(this);
  }

  componentDidMount() {
    this.refreshCourses();
  }

  refreshCourses() {
    DataService.retrieveAllCourses(INSTRUCTOR) //HARDCODED
      .then(response => {
        //console.log(response);
        this.setState({ courses: response.data });
      });
  }

  deleteCourseClicked(id) {
    DataService.deleteCourse(INSTRUCTOR, id).then(response => {
      this.setState({ message: `Delete of course ${id} Successful` });
      this.refreshCourses();
    });
  }

  updateCourseClicked(id) {
    this.props.history.push(`/courses/${id}`);
  }

  addCourseClicked() {
    this.props.history.push(`/courses/-1`);
  }

  addStudentClicked() {
    this.props.history.push(`/students/-1`);
  }

  getCourseClicked(id) {
    DataService.getStudentsOfCourse(INSTRUCTOR, id).then(response => {
      response.data.forEach(currentStudent => {
        document
          .getElementById(id.toString())
          .querySelector(".dropdown-menu").innerHTML += `
                    <li>           
                    <a>
                    (${currentStudent.studentid})
                    ${currentStudent.studentname}
                    ${currentStudent.studentsurname}
                    </a>
                    </li> 
                    `;
      });

      // this.setState({ students: response.data })
    });
  }

  eraseCourseClicked(id) {
    document
      .getElementById(id.toString())
      .querySelector(".dropdown-menu").innerHTML = "";
  }

  viewCoursesClicked() {
    this.props.history.push(`/students/`);
  }

  addStudentToCourseClicked(id) {
    this.props.history.push(`/add/${id}`);
  }

  deleteStudentFromCourseClicked(id) {
    this.props.history.push(`/remove/${id}`);
  }

  render() {
    return (
      <div className="container">
        <h3>All Courses</h3>
        {this.state.message && (
          <div className="alert alert-success">{this.state.message}</div>
        )}
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Description</th>
                <th>Max. Student</th>
                <th>Delete</th>
                <th>Update</th>
                <th>Students</th>
                <th>Add Student</th>
                <th>Remove Student</th>
              </tr>
            </thead>
            <tbody>
              {this.state.courses.map(course => (
                <tr id={course.id} key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.description}</td>
                  <td>{course.studentnumber}</td>

                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => this.deleteCourseClicked(course.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => this.updateCourseClicked(course.id)}
                    >
                      Update
                    </button>
                  </td>

                  <td>
                    <div className="dropdown">
                      <button
                        className="btn btn-primary dropdown-toggle"
                        onMouseUp={() => this.getCourseClicked(course.id)}
                        onClick={() => this.eraseCourseClicked(course.id)}
                        data-toggle="dropdown"
                      >
                        <span className="caret" />
                      </button>
                      <ul className="dropdown-menu" />
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => this.addStudentToCourseClicked(course.id)}
                    >
                      +
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        this.deleteStudentFromCourseClicked(course.id)
                      }
                    >
                      -
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row justify-content-between">
            <button className="btn btn-success" onClick={this.addCourseClicked}>
              Create Course
            </button>
            <button
              className="btn btn-warning"
              onClick={this.addStudentClicked}
            >
              Create Student
            </button>
            <button
              className="btn btn-primary"
              onClick={this.viewCoursesClicked}
            >
              View All Students
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ListCoursesComponent;
