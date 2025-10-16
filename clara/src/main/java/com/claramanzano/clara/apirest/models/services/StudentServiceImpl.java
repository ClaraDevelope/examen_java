package com.claramanzano.clara.apirest.models.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.claramanzano.clara.apirest.models.dao.ICourseRepositoryDAO;
import com.claramanzano.clara.apirest.models.dao.IStudentRepositoryDAO;
import com.claramanzano.clara.apirest.models.entities.Course;
import com.claramanzano.clara.apirest.models.entities.Student;

@Service
public class StudentServiceImpl implements IStudentService {

    private final IStudentRepositoryDAO studentRepo;
    private final ICourseRepositoryDAO courseRepo;

    public StudentServiceImpl(IStudentRepositoryDAO studentRepo, ICourseRepositoryDAO courseRepo) {
        this.studentRepo = studentRepo;
        this.courseRepo = courseRepo;
    }


    @Override
    @Transactional(readOnly = true)
    public Iterable<Student> findAll() {
        return studentRepo.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public java.util.Optional<Student> findById(Long id) {
        return studentRepo.findById(id);
    }

    @Override
    @Transactional
    public Student save(Student student) {
        return studentRepo.save(student);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        studentRepo.deleteById(id);
    }


    @Override
    @Transactional
    public Student assignCourse(Long studentId, Long courseId) {
        Student student = studentRepo.findById(studentId)
            .orElseThrow(() -> new RuntimeException("Estudiante no encontrado: " + studentId));

        Course course = courseRepo.findById(courseId)
            .orElseThrow(() -> new RuntimeException("Curso no encontrado: " + courseId));

        if (student.getCourses() == null) {
            student.setCourses(new ArrayList<>());
        }
        if (!student.getCourses().contains(course)) {
            student.getCourses().add(course);
        }


        if (course.getStudents() == null) {
            course.setStudents(new ArrayList<>());
        }
        if (!course.getStudents().contains(student)) {
            course.getStudents().add(student);
        }

        return studentRepo.save(student);
    }

    @Override
    @Transactional
    public Student removeCourse(Long studentId, Long courseId) {
        Student student = studentRepo.findById(studentId)
            .orElseThrow(() -> new RuntimeException("Estudiante no encontrado: " + studentId));

        Course course = courseRepo.findById(courseId)
            .orElseThrow(() -> new RuntimeException("Curso no encontrado: " + courseId));

        if (student.getCourses() != null) {
            student.getCourses().remove(course);
        }
        if (course.getStudents() != null) {
            course.getStudents().remove(student);
        }

        return studentRepo.save(student);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Course> listCoursesByStudent(Long studentId) {
        Student student = studentRepo.findById(studentId)
            .orElseThrow(() -> new RuntimeException("Estudiante no encontrado: " + studentId));

        return student.getCourses() == null ? List.of() : new ArrayList<>(student.getCourses());
    }
}
