import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../../models/course';
import { URL_API } from '../enviroments/global';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = URL_API + 'curso';

  constructor(private http: HttpClient) {}


  getAll(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}s`);
  }


  getById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  create(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }


  update(course: Course): Observable<Course> {
    return this.http.put<Course>(this.apiUrl, course);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
