import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Student } from '../../models/student';
import { Course } from '../../models/course';
import { StudentService } from '../../core/services/student.service';
import { CourseService } from '../../core/services/course.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-detail',
  imports:[CommonModule, ReactiveFormsModule],
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private studentService = inject(StudentService);
  private courseService = inject(CourseService);

  studentId!: number;
  student!: Student;
  assigned: Course[] = [];
  allCourses: Course[] = [];
  loading = false;
  error: string | null = null;

  form: FormGroup = this.fb.group({
    courseId: [null]
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.router.navigate(['/students']);
      return;
    }
    this.studentId = id;
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.error = null;

    this.studentService.getById(this.studentId).subscribe({
      next: s => this.student = s,
      error: err => {
        this.error = 'No se pudo cargar el estudiante';
        console.error(err);
        this.loading = false;
      }
    });

    this.studentService.getCourses(this.studentId).subscribe({
      next: cs => {
        this.assigned = cs ?? [];
        this.loading = false;
      },
      error: err => {
        this.error = 'No se pudieron cargar los cursos del estudiante';
        console.error(err);
        this.loading = false;
      }
    });

    // todos los cursos (para seleccionar y asignar)
    this.courseService.getAll().subscribe({
      next: cs => this.allCourses = cs ?? [],
      error: err => console.error(err)
    });
  }

  assign(): void {
    const courseId = this.form.value.courseId;
    if (!courseId) return;

    this.studentService.assignCourse(this.studentId, courseId).subscribe({
      next: () => {
        this.studentService.getCourses(this.studentId).subscribe(cs => this.assigned = cs ?? []);
        this.form.reset();
      },
      error: err => {
        this.error = 'No se pudo asignar el curso';
        console.error(err);
      }
    });
  }

  remove(courseId: number): void {
    this.studentService.removeCourse(this.studentId, courseId).subscribe({
      next: () => {
        this.assigned = this.assigned.filter(c => c.id !== courseId);
      },
      error: err => {
        this.error = 'No se pudo eliminar el curso del estudiante';
        console.error(err);
      }
    });
  }
}
