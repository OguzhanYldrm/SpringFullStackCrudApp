import axios from "axios";

const INSTRUCTOR = "in28minutes";
const COURSE_API_URL = "http://localhost:8080";
const INSTRUCTOR_API_URL = `${COURSE_API_URL}/instructors/${INSTRUCTOR}`;

class DataService {
  //Course Queries Part
  retrieveAllCourses(name) {
    //console.log('executed service')
    return axios.get(`${INSTRUCTOR_API_URL}/courses`);
  }

  retrieveCourse(name, id) {
    //console.log('executed service')
    return axios.get(`${INSTRUCTOR_API_URL}/courses/${id}`);
  }

  deleteCourse(name, id) {
    //console.log('executed service')
    return axios.delete(`${INSTRUCTOR_API_URL}/courses/${id}`);
  }

  updateCourse(name, id, course) {
    //console.log('executed service')

    return axios.put(`${INSTRUCTOR_API_URL}/courses/${id}`, course);
  }

  createCourse(name, course) {
    //console.log('executed service')
    return axios.post(`${INSTRUCTOR_API_URL}/courses/`, course);
  }

  getStudentsOfCourse(name, id) {
    return axios.get(`${INSTRUCTOR_API_URL}/courses/${id}/students`);
  }

  addStudent(name, id, studentid) {
    //console.log('executed service')
    return axios.post(`${INSTRUCTOR_API_URL}/add/${id}/to/${studentid}`);
  }

  removeStudent(name, id, studentid) {
    //console.log('executed service')
    return axios.delete(`${INSTRUCTOR_API_URL}/remove/${id}/from/${studentid}`);
  }
  //--------------------------------------------------------------------------------------------------
  //Student Queries Part
  retrieveAllStudents(name) {
    //console.log('executed service')
    return axios.get(`${INSTRUCTOR_API_URL}/students`);
  }

  retrieveStudent(name, studentid) {
    //console.log('executed service')
    return axios.get(`${INSTRUCTOR_API_URL}/students/${studentid}`);
  }

  deleteStudent(name, studentid) {
    //console.log('executed service')
    return axios.delete(`${INSTRUCTOR_API_URL}/students/${studentid}`);
  }

  updateStudent(name, studentid, student) {
    //console.log('executed service')
    return axios.put(`${INSTRUCTOR_API_URL}/students/${studentid}`, student);
  }

  createStudent(name, student) {
    //console.log('executed service')
    return axios.post(`${INSTRUCTOR_API_URL}/students/`, student);
  }
}

export default new DataService();
