package com.claramanzano.clara.apirest.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.claramanzano.clara.apirest.models.entities.Course;
import com.claramanzano.clara.apirest.models.services.ICourseService;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CourseController {

    private final ICourseService courseService;

    public CourseController(ICourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/cursos")
    public ResponseEntity<Iterable<Course>> findAll() {
        return ResponseEntity.ok(courseService.findAll());
    }


    @GetMapping("/curso/{id}")
    public ResponseEntity<Course> findById(@PathVariable Long id) {
        Optional<Course> opt = courseService.findById(id);
        return opt.map(ResponseEntity::ok)
                  .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @PostMapping("/curso")
    public ResponseEntity<Course> create(@RequestBody Course course) {
        Course saved = courseService.save(course);
        return ResponseEntity.created(URI.create("/curso/" + saved.getId()))
                             .body(saved);
    }


    @PutMapping("/curso")
    public ResponseEntity<Course> update(@RequestBody Course course) {
        if (course.getId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        Optional<Course> exists = courseService.findById(course.getId());
        if (exists.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Course updated = courseService.save(course);
        return ResponseEntity.ok(updated);
    }

     @DeleteMapping("/curso/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Optional<Course> exists = courseService.findById(id);
        if (exists.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        courseService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
