package com.claramanzano.clara.apirest.models.dao;

import org.springframework.data.repository.CrudRepository;
import com.claramanzano.clara.apirest.models.entities.Student;

public interface IStudentRepositoryDAO extends CrudRepository<Student, Long> {

}
