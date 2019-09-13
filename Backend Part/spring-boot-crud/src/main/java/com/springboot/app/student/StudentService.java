package com.springboot.app.student;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.app.repository.StudentRepository;

@Service
public class StudentService {

	@Autowired
	private StudentRepository studentrepository;
	
	public List<Student> findAllStudents() {
		List<Student> students = new ArrayList<>();
		
		studentrepository.findAll().forEach(students::add); 
		
		return students;
	}

	public Student save(Student student) {
		studentrepository.save(student);
		
		return student;
	}

	public Student deleteById(long id) {
	  
		Student tempstudent = studentrepository.getOne(id);
		
		if (tempstudent == null) {
			return null;}
		studentrepository.deleteById(id);  
		
		return tempstudent;
	}

	public Optional<Student> findById(long id) {
		return studentrepository.findById(id);
	}
}
