import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../../models/student';
import { URL_API } from '../enviroments/global';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = URL_API + 'estudiante';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}s`);
  }

  getById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  create(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  update(student: Student): Observable<Student> {
    return this.http.put<Student>(this.apiUrl, student);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  assignCourse(studentId: number, courseId: number): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/${studentId}/curso/${courseId}`, {});
  }

  removeCourse(studentId: number, courseId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${studentId}/curso/${courseId}`);
  }

  getCourses(studentId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${studentId}/cursos`);
  }
}
