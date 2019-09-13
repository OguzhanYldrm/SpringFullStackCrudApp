package com.springboot.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springboot.app.course.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course,Long>{

}
