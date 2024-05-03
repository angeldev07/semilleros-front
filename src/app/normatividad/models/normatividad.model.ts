export interface Normatividad {
    id?: number; // opcional si se crea una nueva normatividad que aún no tiene ID
    titulo: string;
    fechaSubida: Date;
    url: string;
    formato: string;
    semillero: number; // Asumiendo que es el ID del semillero
    ruta?: string; // opcional, dependiendo de si se necesitas o no
  }
  