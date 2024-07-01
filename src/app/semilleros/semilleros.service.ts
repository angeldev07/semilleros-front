import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SemillerosService {
  private apiUrl = 'https://siredseufps2024j-53bcd51baaf2.herokuapp.com/api/semilleros';

  constructor(private http: HttpClient) {}

  getAllSemilleros(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearSemillero(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }

  updateSemillero(id: number, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, formData);
  }

  deleteSemillero(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
