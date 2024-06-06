import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
  export class FormatoService {

    constructor(private http: HttpClient) { }


    private apiUrl = 'http://localhost:8080/api/documents'; // URL base de tu API

    downloadFormato14(email: string): Observable<Blob> {
        // Set up HttpParams
        const params = new HttpParams().set('email', email);
    
        // Return the HTTP GET request with proper options
        return this.http.get(`${this.apiUrl}/generate-document`, {
          params: params,
          responseType: 'blob'  // Specify responseType directly within options
        });
      }
    
    }