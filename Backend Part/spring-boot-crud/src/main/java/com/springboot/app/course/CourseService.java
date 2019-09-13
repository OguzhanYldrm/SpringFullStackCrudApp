package com.springboot.app.course;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.app.repository.CourseRepository;


@Service
public class CourseService {

	@Autowired
	private CourseRepository courseRepository;
	
	
	public List<Course> findAllCourses() {
		List<Course> courses = new ArrayList<>();
		courseRepository.findAll().forEach(courses::add); 
		return courses;
	}

	public Course save(Course course) {
		courseRepository.save(course);
		
		return course;
	}

	public Course deleteById(long id) {
	  
		Course tempcourse = courseRepository.getOne(id);
		if (tempcourse == null) {
			return null;}
		courseRepository.deleteById(id);  
		
		return tempcourse;
	}

	public Optional<Course> findById(long id) {
		return courseRepository.findById(id);
	}
	
	
}
