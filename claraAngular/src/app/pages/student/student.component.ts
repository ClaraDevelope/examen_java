import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Student } from '../../models/student';
import { StudentService } from '../../core/services/student.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student',
  imports:[CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  private fb = inject(FormBuilder);
  private studentService = inject(StudentService);

  students: Student[] = [];
  loading = false;
  error: string | null = null;


  form: FormGroup = this.fb.group({
    id: [null],
    nombre: ['', [Validators.required, Validators.maxLength(80)]],
    apellido: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
  });

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.loading = true;
    this.error = null;
    this.studentService.getAll().subscribe({
      next: (data) => {
        this.students = data ?? [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar los estudiantes.';
        console.error(err);
        this.loading = false;
      }
    });
  }

  startEdit(s: Student): void {
    this.form.patchValue({
      id: s.id ?? null,
      nombre: s.nombre,
      apellido: s.apellido,
      email: s.email
    });
    // Scroll sólo si `window` está disponible (evita errores en SSR o entornos sin DOM)
    if (typeof window !== 'undefined' && window?.scrollTo) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }


  cancelEdit(): void {
    this.form.reset();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: Student = this.form.value;

    if (payload.id) {
      this.studentService.update(payload).subscribe({
        next: (updated) => {
          this.students = this.students.map(s => s.id === updated.id ? updated : s);
          this.form.reset(); 
        },
        error: (err) => {
          this.error = 'No se pudo actualizar el estudiante.';
          console.error(err);
        }
      });
    } else {
      this.studentService.create(payload).subscribe({
        next: (created) => {
          this.students = [created, ...this.students];
          this.form.reset();
        },
        error: (err) => {
          this.error = 'No se pudo crear el estudiante.';
          console.error(err);
        }
      });
    }
  }

  delete(id: number | undefined): void {
    if (!id) return;
    this.studentService.delete(id).subscribe({
      next: () => {
        this.students = this.students.filter(s => s.id !== id);
        if (this.form.value.id === id) {
          this.form.reset();
        }
      },
      error: (err) => {
        this.error = 'No se pudo eliminar el estudiante.';
        console.error(err);
      }
    });
  }
}
