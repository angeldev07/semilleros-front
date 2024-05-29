export interface Album {
    id: number;
    titulo: string;
    descripcion: string;
    fechaCreacion: Date;
    fechaActualizacion: Date;
    ubicacionAlbum: string;
    ruta: string;
  }
  
  export interface ContenidoMultimedia {
    id: number;
    titulo: string;
    fechaSubida: Date;
    url: string;
    formato: string;
    ruta: string;
    album: Album;
  }