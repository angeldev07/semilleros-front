import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  private apiUrl = 'https://siredseufps2024j.herokuapp.com/api/proyectos';
  constructor(private http: HttpClient) {}

  getAllProyectos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearProyecto(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }

  updateProyecto(id: number, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, formData);
  }

  deleteProyecto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
