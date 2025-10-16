import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Course } from '../../models/course';
import { CourseService } from '../../core/services/course.service';

@Component({
  selector: 'app-course',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  private fb = inject(FormBuilder);
  private courseService = inject(CourseService);

  courses: Course[] = [];
  loading = false;
  error: string | null = null;

  form: FormGroup = this.fb.group({
    id: [null],
    nombre: ['', [Validators.required, Validators.maxLength(120)]],
    descripcion: ['',[Validators.maxLength(255)]],
  });

  ngOnInit(): void {
    this.loadCourses();
  }

  onEdit(c: Course): void {
    this.form.patchValue(c);
    if (typeof window !== 'undefined' && window?.scrollTo) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  loadCourses(): void {
    this.loading = true;
    this.error = null;
    this.courseService.getAll().subscribe({
      next: (data) => {
        this.courses = data ?? [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar los cursos.';
        console.error(err);
        this.loading = false;
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: Course = this.form.value;

    this.courseService.create(payload).subscribe({
      next: (created) => {
        this.courses = [created, ...this.courses];
        this.form.reset();
      },
      error: (err) => {
        this.error = 'No se pudo crear el curso.';
        console.error(err);
      }
    });
  }

  delete(id: number | undefined): void {
    if (!id) return;
    this.courseService.delete(id).subscribe({
      next: () => {
        this.courses = this.courses.filter(c => c.id !== id);
      },
      error: (err) => {
        this.error = 'No se pudo eliminar el curso.';
        console.error(err);
      }
    });
  }
}

