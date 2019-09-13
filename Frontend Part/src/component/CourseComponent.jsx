import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DataService from "../service/DataService";

const INSTRUCTOR = "in28minutes";

class CourseComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      description: "",
      studentnumber: "",
      studentlist: []
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    // eslint-disable-next-line
    if (this.state.id == -1) {
      return;
    }

    DataService.retrieveCourse(INSTRUCTOR, this.state.id).then(response =>
      this.setState({
        description: response.data.description,
        studentnumber: response.data.studentnumber
      })
    );
  }

  validate(values) {
    let errors = {};
    if (!values.description) {
      errors.description = "Enter a Description";
    } else if (!values.studentnumber) {
      errors.description = "Enter Student Number";
    } else if (values.description.length < 5) {
      errors.description = "Enter at least 5 Characters in Description";
    } else if (values.studentnumber > 25) {
      errors.description = "You exceeded the MAX Number of Students ";
    } else if (isNaN(values.studentnumber)) {
      errors.description = "Please Enter Numbers ";
    }

    return errors;
  }

  onSubmit(values) {
    let username = INSTRUCTOR;

    var course = {
      id: this.state.id,
      description: values.description,
      studentnumber: values.studentnumber,
      studentlist: []
    };

    if (this.state.id === "-1") {
      DataService.createCourse(username, course).then(() =>
        this.props.history.push("/courses")
      );
    } else {
      DataService.getStudentsOfCourse(username, this.state.id).then(
        response => (course.studentlist = response.data),

        DataService.updateCourse(username, this.state.id, course).then(() =>
          this.props.history.push("/courses")
        )
      );
    }
  }

  render() {
    let { id } = this.state;

    return (
      <div>
        <h3>Course</h3>
        <div className="container">
          <Formik
            initialValues={null}
            onSubmit={this.onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validate={this.validate}
            enableReinitialize={true}
          >
            {props => (
              <Form>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="alert alert-warning"
                />
                <fieldset className="form-group">
                  <label>Id</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="id"
                    value={id}
                    disabled
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label>Description</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="description"
                    placeholder="Longer than 5 Characters..."
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label>Student Number</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="studentnumber"
                    placeholder="Smaller than 25..."
                  />
                </fieldset>
                <button className="btn btn-success" type="submit">
                  Save Course
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default CourseComponent;
