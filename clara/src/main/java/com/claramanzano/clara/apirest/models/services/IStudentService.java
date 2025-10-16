package com.claramanzano.clara.apirest.models.services;

import java.util.List;
import java.util.Optional;

import com.claramanzano.clara.apirest.models.entities.Course;
import com.claramanzano.clara.apirest.models.entities.Student;

public interface IStudentService {

    Iterable<Student> findAll();
    Optional<Student> findById(Long id);
    Student save(Student student);
    void deleteById(Long id);


    Student assignCourse(Long studentId, Long courseId);
    Student removeCourse(Long studentId, Long courseId);
    List<Course> listCoursesByStudent(Long studentId);
}
