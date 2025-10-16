import { Course } from './course';

export interface Student {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  courses?: Course[];
}
