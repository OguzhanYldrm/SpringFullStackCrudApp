package com.springboot.app.student;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.springboot.app.course.Course;

@Entity
@Table(name = "student")

public class Student {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "studentname")
	private String studentname;
	@Column(name = "studentsurname")
	private String studentsurname;
	
	@ManyToMany(fetch = FetchType.LAZY,cascade = {
			CascadeType.PERSIST,
			CascadeType.MERGE,
	       
	    },
            mappedBy = "studentlist")
	@OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Course> courselist = new HashSet<>();
	
	
	public Student() {
		
	}
	
	public Student(Long id,String studentname,String studentsurname,Set<Course> courselist) {
		super();
		this.id = id;
		this.studentname = studentname;
		this.studentsurname = studentsurname;
		this.setCourses(courselist);
	}

	public Long getStudentid() {
		return id;
	}

	public void setStudentid(Long id) {
		this.id = id;
	}

	public String getStudentname() {
		return studentname;
	}

	public void setStudentname(String studentname) {
		this.studentname = studentname;
	}

	public String getStudentsurname() {
		return studentsurname;
	}

	public void setStudentsurname(String studentsurname) {
		this.studentsurname = studentsurname;
	}
	
	@JsonBackReference
	public Set<Course> getCourses() {
		return courselist;
	}

	public void setCourses(Set<Course> courselist) {
		this.courselist = courselist;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((studentname == null) ? 0 : studentname.hashCode());
		result = prime * result + ((studentsurname == null) ? 0 : studentsurname.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Student other = (Student) obj;
		if (courselist == null) {
			if (other.courselist != null)
				return false;
		} else if (!courselist.equals(other.courselist))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (studentname == null) {
			if (other.studentname != null)
				return false;
		} else if (!studentname.equals(other.studentname))
			return false;
		if (studentsurname == null) {
			if (other.studentsurname != null)
				return false;
		} else if (!studentsurname.equals(other.studentsurname))
			return false;
		return true;
	}

	

	

	
	
}
