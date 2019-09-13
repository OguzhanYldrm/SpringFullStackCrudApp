package com.springboot.app.student;


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

import com.springboot.app.course.Course;
import com.springboot.app.course.CourseService;
import com.springboot.app.exceptions.ResourceNotFoundException;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
@RestController
public class StudentResource {

  @Autowired
  private CourseService courseManagementService;

  @Autowired
  private StudentService studentManagementService;
  
  @GetMapping("/instructors/{username}/students")
  public List<Student> getAllStudents(@PathVariable String username) {
    return studentManagementService.findAllStudents();
  }

  @GetMapping("/instructors/{username}/students/{studentid}")
  public Optional<Student> getStudent(@PathVariable String username, @PathVariable long studentid) {
    return studentManagementService.findById(studentid);
  }
  
  
  
  @DeleteMapping("/instructors/{username}/students/{id}")
  public ResponseEntity<Void> deleteStudent(@PathVariable String username, @PathVariable long id) {
	
    studentManagementService.findById(id).get().getCourses().clear();
    
	Student student = studentManagementService.deleteById(id);
    
    if (student != null) {
      return ResponseEntity.noContent().build();
    }

    return ResponseEntity.notFound().build();
  }

  @PutMapping("/instructors/{username}/students/{id}")
  public ResponseEntity<Student> updateStudent(@PathVariable String username, @PathVariable long id,
      @RequestBody Student student) {
	  
	  studentManagementService.save(student);

    return new ResponseEntity<Student>(student, HttpStatus.OK);
  }

  @PostMapping("/instructors/{username}/students")
  public ResponseEntity<Void> createStudent(@PathVariable String username, @RequestBody Student student) {

	  Student createdStudent = studentManagementService.save(student);

    // Location
    // Get current resource url
    /// {id}
    URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdStudent.getStudentid())
        .toUri();

    return ResponseEntity.created(uri).build();
  }
  
  
  
  public Set<Course> addCourses(Long courseid,Long studentid){
      
	  // Finds a persisted course
	  Course course = courseManagementService.findById(courseid).orElseThrow(
              () -> new ResourceNotFoundException("Course", courseid)
      );
      
      // Finds a student and adds the given course to the lecturer's set.
      return studentManagementService.findById(studentid).map((student) -> {
    	  student.getCourses().add(course);
          return studentManagementService.save(student).getCourses();
      }).orElseThrow(() -> new ResourceNotFoundException("Student", studentid));
  }
  

}
