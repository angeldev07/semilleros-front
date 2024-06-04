import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }

  getConfig(): Observable<any> {
    return this.http.get<any>(`${environment.api}/configuracion`);
  }



  putConfig(data: any): Observable<any>{
    return this.http.put<any>(`${environment.api}/configuracion`, data)
  }

}