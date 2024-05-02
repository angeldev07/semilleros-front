import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostHomeService {

  constructor(private http: HttpClient) { }

  getPostRecientes(){
    return this.http.get(`${environment.api}/posts/recent`)
  }

  searchByTitle(title: string){
    return this.http.get(`${environment.api}/posts/title/${title}`)
  }

}
