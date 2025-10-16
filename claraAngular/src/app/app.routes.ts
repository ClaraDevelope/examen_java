import { Routes } from '@angular/router';
import { StudentComponent } from './pages/student/student.component';
import { CourseComponent } from './pages/course/course.component';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';


export const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'students', component: StudentComponent },
  { path: 'student/:id', component: StudentDetailComponent},
  { path: 'courses', component: CourseComponent},
  { path: '**', redirectTo: 'students' }
];
