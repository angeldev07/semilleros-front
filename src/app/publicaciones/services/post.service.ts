import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }


  listarPost(){
    return this.http.get(`${environment.api}/posts`).pipe(
      map((res:any)=>{
        return res.map((post:any)=> ({
          id: post.id,
          titulo: post.titulo,
          imagen: post.imagen,
          fechaCreacion: post.fechaCreacion,
          tag: post.tag,
          link: post.link,
          uniqueTitleId: post.uniqueTitleId
        }) )
      })
    )
  }

  eliminarPost(uniqueId: string){
    return this.http.delete(`${environment.api}/posts/delete/${uniqueId}`)
  }

  crearPost(data: any){
    return this.http.post(`${environment.api}/posts/create`, data)
  }

}
