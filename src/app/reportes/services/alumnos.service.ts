import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private apiUrl = 'http://localhost:8080/reportes/enrolled-students';

  constructor(private http: HttpClient) { }

  getEnrolledStudents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
