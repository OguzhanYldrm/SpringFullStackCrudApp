import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import DataService from '../service/DataService';

const INSTRUCTOR = 'in28minutes'

class StudentComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      studentid: this.props.match.params.studentid,
      studentname: '',
      studentsurname: ''
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.validate = this.validate.bind(this)

  }

  componentDidMount() {

    //console.log(this.state.studentid)

    // eslint-disable-next-line
    if (this.state.studentid == -1) {
      return
    }

    DataService.retrieveStudent(INSTRUCTOR, this.state.studentid)
      .then(response => this.setState({
        studentname: response.data.studentname,
        studentsurname: response.data.studentsurname
      }))
  }

  validate(values) {
    let errors = {}
    if (!values.studentname) {
      errors.description = 'Enter a Name'

    }
    else if (!values.studentsurname) {

      errors.description = 'Enter Surname'
    }





    return errors
  }

  onSubmit(values) {
    let username = INSTRUCTOR

    let student = {
      studentid: this.state.studentid,
      studentname: values.studentname,
      studentsurname: values.studentsurname,

    }


    if (this.state.studentid === -1) {
      DataService.createStudent(username, student)
        .then(() => this.props.history.push('/students'))
    } else {
      DataService.updateStudent(username, this.state.studentid, student)
        .then(() => this.props.history.push('/students'))
    }

    //console.log(values);
  }

  render() {

    let { studentid } = this.state

    return (
      <div>
        <h3>Student</h3>
        <div className="container">
          <Formik
            initialValues={null}
            onSubmit={this.onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validate={this.validate}
            enableReinitialize={true}


          >
            {
              (props) => (
                <Form>
                  <ErrorMessage name="description" component="div"
                    className="alert alert-warning" />
                  <fieldset className="form-group">
                    <label>Id</label>
                    <Field className="form-control" type="text" name="studentid" value={studentid} disabled />
                  </fieldset>
                  <fieldset className="form-group">
                    <label>Student Name</label>
                    <Field className="form-control" type="text" name="studentname" placeholder="Name..." />
                  </fieldset>
                  <fieldset className="form-group">
                    <label>Student Surname</label>
                    <Field className="form-control" type="text" name="studentsurname" placeholder="Surname..." />
                  </fieldset>
                  <button className="btn btn-success" type="submit">Save Student</button>
                </Form>
              )
            }
          </Formik>

        </div>
      </div>
    )
  }
}

export default StudentComponent