package com.springboot.app.course;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.springboot.app.exceptions.ResourceNotFoundException;
import com.springboot.app.student.Student;
import com.springboot.app.student.StudentService;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
@RestController
public class CourseResource {

  @Autowired
  private CourseService courseManagementService;

  @Autowired
  private StudentService studentManagementService;
  
  @GetMapping("/instructors/{username}/courses")
  public List<Course> getAllCourses(@PathVariable String username) {
    return courseManagementService.findAllCourses();
  }
  
  @GetMapping("/instructors/{username}/courses/{id}/students")
  public Set<Student> getStudents(@PathVariable long id){
      
	  
	  return courseManagementService.findById(id).get().getStudentlist();
  }

  @GetMapping("/instructors/{username}/courses/{id}")
  public Optional<Course> getCourse(@PathVariable String username, @PathVariable long id) {
    return courseManagementService.findById(id);
  }

  @DeleteMapping("/instructors/{username}/courses/{id}")
  public ResponseEntity<Void> deleteCourse(@PathVariable String username, @PathVariable long id) {

    Course course = courseManagementService.deleteById(id);

    if (course != null) {
      return ResponseEntity.noContent().build();
    }

    return ResponseEntity.notFound().build();
  }

  @PutMapping("/instructors/{username}/courses/{id}")
  public ResponseEntity<Course> updateCourse(@PathVariable String username, @PathVariable long id,
      @RequestBody Course course) {
	  course.setStudentlist(courseManagementService.findById(id).get().getStudentlist());
	  
	  courseManagementService.save(course);
	  
	  return new ResponseEntity<Course>(course, HttpStatus.OK);
  }

  @PostMapping("/instructors/{username}/courses")
  public ResponseEntity<Void> createCourse(@PathVariable String username, @RequestBody Course course) {

    Course createdCourse = courseManagementService.save(course);

    // Location
    // Get current resource url
    /// {id}
    URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdCourse.getId())
        .toUri();

    return ResponseEntity.created(uri).build();
  }
  
  @PostMapping("/instructors/{username}/add/{id}/to/{studentId}") // Path variable names must match with method's signature variables.
  public Set<Student> addStudent(@PathVariable Long id, @PathVariable Long studentId){
      
	  // Finds a persisted student
      Student student = studentManagementService.findById(studentId).orElseThrow(
              () -> new ResourceNotFoundException("Student", studentId)
      );
      
      // Finds a student and adds the given student to the lecturer's set.
      return courseManagementService.findById(id).map((course) -> {
    	  course.getStudentlist().add(student);
          return courseManagementService.save(course).getStudentlist(); 
      }).orElseThrow(() -> new ResourceNotFoundException("Course", id));
  }
  
  @DeleteMapping("/instructors/{username}/remove/{id}/from/{studentId}") // Path variable names must match with method's signature variables.
  public Set<Student> removeStudent(@PathVariable Long id, @PathVariable Long studentId){
      
	  // Finds a persisted student
      Student student = studentManagementService.findById(studentId).orElseThrow(
              () -> new ResourceNotFoundException("Student", studentId)
      );
      
      // Finds a course and adds the given student to the lecturer's set.
      return courseManagementService.findById(id).map((course) -> {
    	  course.getStudentlist().remove(student);
          return courseManagementService.save(course).getStudentlist(); 
      }).orElseThrow(() -> new ResourceNotFoundException("Course", id));
  }
}