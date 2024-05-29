import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PQR } from '../api/usr';

@Injectable({
  providedIn: 'root'
})
export class PqrsService {

  constructor(private http: HttpClient) { }

  getPqrs() {
    return this.http.get(`${environment.api}/pqrs`);
  }

  savePqrs(pqrs: PQR) {
    const url = `${environment.api}/pqrs/create`;
    const params = { tipoPQRSID: pqrs.tipoPqrs };
    return this.http.post<PQR>(url, pqrs, { params });
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
