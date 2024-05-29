import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Album, ContenidoMultimedia } from '../api/multimedia';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  private readonly baseUrl = '/public';

  constructor(private http: HttpClient) { }

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${environment.api}/public/album`);
  }

  createAlbum(album: Album): Observable<Album> {
    return this.http.post<Album>(`${environment.api}/public/album`, album);
  }

  deleteAlbum(albumId: number): Observable<string> {
    return this.http.delete<string>(`${environment.api}/public/album?albumId=${albumId}`);
  }

  getContenidoMultimediaByAlbum(albumId: number): Observable<ContenidoMultimedia[]> {
    return this.http.get<ContenidoMultimedia[]>(`${environment.api}/public/media/album?albumId=${albumId}`);
  }

  uploadContenidoMultimedia(albumId: number, titulo: string, file: File): Observable<ContenidoMultimedia> {
    const formData = new FormData();
    formData.append('albumId', albumId.toString());
    formData.append('titulo', titulo);
    formData.append('file', file);

    return this.http.post<ContenidoMultimedia>(`${environment.api}/public/media/upload`, formData);
  }

  deleteContenidoMultimedia(contentId: number): Observable<string> {
    return this.http.delete<string>(`${environment.api}/public/media?contentId=${contentId}`);
  }
}
