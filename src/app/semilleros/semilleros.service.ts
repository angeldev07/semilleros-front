// src/app/semilleros/semilleros.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SemillerosService {
  private apiUrl = 'http://localhost:8080/api/semilleros';

  constructor(private http: HttpClient) { }

  // GET all semilleros
  getAllSemilleros(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // GET a single semillero by ID
  getSemillero(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // POST to create a new semillero
  crearSemillero(semilleroData: any): Observable<any> {
    return this.http.post(this.apiUrl, semilleroData);
  }

  // PUT to update a semillero by ID
  updateSemillero(id: number, semilleroData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, semilleroData);
  }

  // DELETE a semillero by ID
  deleteSemillero(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
