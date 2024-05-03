import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Normatividad } from '../models/normatividad.model';

@Injectable({
  providedIn: 'root'
})
export class NormatividadService {
    private apiUrl = 'http://localhost:8080/public/regulation';

    constructor(private http: HttpClient) { }

    // Método para subir una nueva normatividad
    uploadRegulation(semilleroId: number, file: File): Observable<Normatividad> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        formData.append('semilleroId', semilleroId.toString());

        return this.http.post<Normatividad>(`${this.apiUrl}`, formData);
    }

    // Método para listar todas las normatividades
    listRegulations(): Observable<Normatividad[]> {
        return this.http.get<Normatividad[]>(`${this.apiUrl}`);
    }
}
