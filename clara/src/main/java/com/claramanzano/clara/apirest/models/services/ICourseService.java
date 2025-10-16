package com.claramanzano.clara.apirest.models.services;

import java.util.Optional;

import com.claramanzano.clara.apirest.models.entities.Course;

public interface ICourseService {

    Iterable<Course> findAll();
    Optional<Course> findById(Long id);
    Course save(Course course);
    void deleteById(Long id);
}
