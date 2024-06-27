// src/app/semilleros/semilleros.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Semillero } from './semillero.model';

@Injectable({
  providedIn: 'root'
})
export class SemillerosService {
  private apiUrl = 'http://localhost:3000/api/semilleros'; // Cambia esto a la URL de tu API

  constructor(private http: HttpClient) {}

  crearSemillero(semillero: Semillero): Observable<Semillero> {
    return this.http.post<Semillero>(this.apiUrl, semillero);
  }

  getAllSemilleros(): Observable<Semillero[]> {
    return this.http.get<Semillero[]>(this.apiUrl);
  }

  getSemillero(id: number): Observable<Semillero> {
    return this.http.get<Semillero>(`${this.apiUrl}/${id}`);
  }

  updateSemillero(id: number, semillero: Semillero): Observable<Semillero> {
    return this.http.put<Semillero>(`${this.apiUrl}/${id}`, semillero);
  }

  deleteSemillero(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
