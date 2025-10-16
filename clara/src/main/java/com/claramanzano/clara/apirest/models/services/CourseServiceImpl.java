package com.claramanzano.clara.apirest.models.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.claramanzano.clara.apirest.models.dao.ICourseRepositoryDAO;
import com.claramanzano.clara.apirest.models.entities.Course;

import java.util.Optional;

@Service
public class CourseServiceImpl implements ICourseService {

    private final ICourseRepositoryDAO courseRepo;

    public CourseServiceImpl(ICourseRepositoryDAO courseRepo) {
        this.courseRepo = courseRepo;
    }

    @Override
    @Transactional(readOnly = true)
    public Iterable<Course> findAll() {
        return courseRepo.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Course> findById(Long id) {
        return courseRepo.findById(id);
    }

    @Override
    @Transactional
    public Course save(Course course) {
        return courseRepo.save(course);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        courseRepo.deleteById(id);
    }
}
