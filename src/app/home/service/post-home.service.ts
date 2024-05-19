import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface Post {
  id: string;
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostHomeService {

  constructor(private http: HttpClient) { }

  getPostRecientes(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.api}/posts/recent`);
  }

  searchByTitle(title: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.api}/posts/title/${title}`);
  }
}
