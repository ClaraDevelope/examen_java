package com.claramanzano.clara.apirest.models.dao;

import org.springframework.data.repository.CrudRepository;
import com.claramanzano.clara.apirest.models.entities.Course;

public interface ICourseRepositoryDAO extends CrudRepository<Course, Long> {

}
