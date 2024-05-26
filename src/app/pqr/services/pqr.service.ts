import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PQR } from '../api/pqr';

@Injectable({
  providedIn: 'root'
})
export class PqrsService {

  constructor(private http: HttpClient) { }

  getPqrs() {
    return this.http.get(`${environment.api}/pqrs`);
  }

  getPQRSById(id: number) {
    return this.http.get<PQR>(`${environment.api}/pqrs/${id}`);
  }

  savePqrs(pqrs: PQR, tipoPqrs: number) {
    const url = `${environment.api}/pqrs/create`;
    const params = { tipoPQRSID: tipoPqrs };
    return this.http.post<PQR>(url, pqrs, { params });
  }

  sendAnswerPqrs(id: number, respuesta: string) {
    return this.http.post(`${environment.api}/pqrs/respuesta?pqrsId=${id}`, { respuesta });
  }

  deletePqrs(id: number) {
    const params = { pqrsID: id }
    return this.http.delete(`${environment.api}/pqrs/delete`, { params });
  }

  changeStatePqrs(id: number, state: string) {
    // const params = { pqrsId: id }
    return this.http.post(`${environment.api}/pqrs/${state}?pqrsId=${id}`, {});
  }

}
