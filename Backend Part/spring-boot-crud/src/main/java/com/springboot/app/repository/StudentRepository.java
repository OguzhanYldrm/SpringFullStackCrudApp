package com.springboot.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.springboot.app.student.Student;

@Repository
public interface  StudentRepository extends JpaRepository<Student,Long> {

}
