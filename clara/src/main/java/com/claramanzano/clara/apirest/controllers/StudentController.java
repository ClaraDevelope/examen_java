package com.claramanzano.clara.apirest.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.claramanzano.clara.apirest.models.entities.Course;
import com.claramanzano.clara.apirest.models.entities.Student;
import com.claramanzano.clara.apirest.models.services.IStudentService;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class StudentController {

    private final IStudentService studentService;

    public StudentController(IStudentService studentService) {
        this.studentService = studentService;
    }


    @GetMapping("/estudiantes")
    public ResponseEntity<Iterable<Student>> findAll() {
        return ResponseEntity.ok(studentService.findAll());
    }


    @GetMapping("/estudiante/{id}")
    public ResponseEntity<Student> findById(@PathVariable Long id) {
        Optional<Student> opt = studentService.findById(id);
        return opt.map(ResponseEntity::ok)
                  .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @PostMapping("/estudiante")
    public ResponseEntity<Student> create(@RequestBody Student student) {
        Student saved = studentService.save(student);
        return ResponseEntity.created(URI.create("/estudiante/" + saved.getId()))
                             .body(saved);
    }


    @PutMapping("/estudiante")
    public ResponseEntity<Student> update(@RequestBody Student student) {
        if (student.getId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        Optional<Student> exists = studentService.findById(student.getId());
        if (exists.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Student updated = studentService.save(student);
        return ResponseEntity.ok(updated);
    }


    @DeleteMapping("/estudiante/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Optional<Student> exists = studentService.findById(id);
        if (exists.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        studentService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/estudiante/{studentId}/curso/{courseId}")
    public ResponseEntity<Student> assignCourse(@PathVariable Long studentId, @PathVariable Long courseId) {
        try {
            Student updated = studentService.assignCourse(studentId, courseId);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException ex) {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/estudiante/{studentId}/curso/{courseId}")
    public ResponseEntity<Student> removeCourse(@PathVariable Long studentId, @PathVariable Long courseId) {
        try {
            Student updated = studentService.removeCourse(studentId, courseId);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException ex) {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/estudiante/{studentId}/cursos")
    public ResponseEntity<List<Course>> listCourses(@PathVariable Long studentId) {
        try {
            List<Course> courses = studentService.listCoursesByStudent(studentId);
            return ResponseEntity.ok(courses);
        } catch (RuntimeException ex) {
            return ResponseEntity.notFound().build();
        }
    }
}
