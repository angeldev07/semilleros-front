import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SemilleroService {
  private apiUrl = 'http://localhost:8080/api/semilleros'; // Cambia esta URL a la correcta

  constructor(private http: HttpClient) {}

  getSemilleros(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  inscribirse(semilleroId: number, codigo: string, user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${semilleroId}/inscribirse`, { codigo, user });
  }
}
