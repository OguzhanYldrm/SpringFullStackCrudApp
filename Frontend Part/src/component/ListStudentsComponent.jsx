import React, { Component } from "react";
import DataService from "../service/DataService";

const INSTRUCTOR = "in28minutes";

class ListStudentsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      students: [],
      message: null
    };
    this.refreshStudents = this.refreshStudents.bind(this);
    this.deleteStudentClicked = this.deleteStudentClicked.bind(this);
    this.updateStudentClicked = this.updateStudentClicked.bind(this);
    this.addCourseClicked = this.addCourseClicked.bind(this);
    this.addStudentClicked = this.addStudentClicked.bind(this);
    this.viewAllCoursesClicked = this.viewAllCoursesClicked.bind(this);
    this.addStudentToCourseClicked = this.addStudentToCourseClicked.bind(this);
  }

  componentDidMount() {
    this.refreshStudents();
  }

  refreshStudents() {
    DataService.retrieveAllStudents(INSTRUCTOR) //HARDCODED
      .then(response => {
        //console.log(response);
        this.setState({ students: response.data });
      });
  }

  deleteStudentClicked(studentid) {
    DataService.deleteStudent(INSTRUCTOR, studentid).then(response => {
      this.setState({ message: `Delete of student ${studentid} Successful` });
      this.refreshStudents();
    });
  }

  updateStudentClicked(studentid) {
    this.props.history.push(`/students/${studentid}`);
  }

  addCourseClicked() {
    this.props.history.push(`/courses/-1`);
  }

  addStudentClicked() {
    this.props.history.push(`/students/-1`);
  }

  viewAllCoursesClicked() {
    this.props.history.push(`/courses/`);
  }

  addStudentToCourseClicked(studentid) {
    if (this.props.match.path.includes("/add")) {
      let courseId = this.props.match.params.id;
      let studentId = studentid;
      DataService.addStudent(INSTRUCTOR, courseId, studentId);
      this.props.history.push(`/courses/`);
    } else {
      alert("You should first choose a course.");
      this.props.history.push(`/courses/`);
    }
  }

  removeCourseFromStudentClicked(studentid) {
    if (this.props.match.path.includes("/remove")) {
      let courseId = this.props.match.params.id;
      let studentId = studentid;
      DataService.removeStudent(INSTRUCTOR, courseId, studentId);
      this.props.history.push(`/courses/`);
    } else {
      alert("You should first choose a course.");
      this.props.history.push(`/courses/`);
    }
  }

  render() {
    return (
      <div className="container">
        <h3>All Students</h3>
        {this.state.message && (
          <div className="alert alert-success">{this.state.message}</div>
        )}
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Delete</th>
                <th>Update</th>
                <th>Add to Course</th>
                <th>Delete from Course</th>
              </tr>
            </thead>
            <tbody>
              {this.state.students.map(student => (
                <tr key={student.studentid}>
                  <td>{student.studentid}</td>
                  <td>{student.studentname}</td>
                  <td>{student.studentsurname}</td>

                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() =>
                        this.deleteStudentClicked(student.studentid)
                      }
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        this.updateStudentClicked(student.studentid)
                      }
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        this.addStudentToCourseClicked(student.studentid)
                      }
                    >
                      +
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        this.removeCourseFromStudentClicked(student.studentid)
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
              onClick={this.viewAllCoursesClicked}
            >
              View All Courses
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ListStudentsComponent;
