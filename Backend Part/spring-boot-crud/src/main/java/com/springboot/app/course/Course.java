package com.springboot.app.course;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import com.springboot.app.student.Student;

@Table(name="course")  
@Entity

public class Course {
	  
	@Id	  
	@GeneratedValue(strategy=GenerationType.IDENTITY) 
	private Long id;
	@Column(name="username")
	private String username;	
	@Column(name="description")
	private String description; 
	@Column(name="studentnumber")
	private Long studentnumber;
	
	@ManyToMany(fetch = FetchType.LAZY,cascade = {
	        CascadeType.PERSIST,
	        CascadeType.MERGE
	    })
	
	@JoinTable(name = "course_student",
    joinColumns =  {@JoinColumn(name = "course_id",referencedColumnName = "id")} ,
    inverseJoinColumns =  {@JoinColumn(name = "student_id", referencedColumnName = "id")} 
	)
	 
	private Set<Student> studentlist = new HashSet<>();
	
	public Course() {
  
	}
	  
	public Course(Long id,String username, String description, long studentnumber,Set<Student> studentlist) {  
		super();  
		this.id = id;
	    this.username = username;
	    this.description = description;
	    this.studentnumber = studentnumber;
	    this.setStudentlist(studentlist);
	}
	
	
	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public Long getStudentnumber() {
		return studentnumber;
	}


	public void setStudentnumber(Long studentnumber) {
		this.studentnumber = studentnumber;
	}

	
	public Set<Student> getStudentlist() {
		return studentlist;
	}


	public void setStudentlist(Set<Student> studentlist) {
		this.studentlist = studentlist;
	}


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((studentnumber == null) ? 0 : studentnumber.hashCode());
		result = prime * result + ((username == null) ? 0 : username.hashCode());
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
		Course other = (Course) obj;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (studentnumber == null) {
			if (other.studentnumber != null)
				return false;
		} else if (!studentnumber.equals(other.studentnumber))
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		return true;
	}


	

	}