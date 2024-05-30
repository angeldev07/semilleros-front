export interface PQR {
  id: number;
  titulo: string,
  descripcion: string,
  correo: string,
  estadoRadicado?: Estado,
  tipoPqrs: number,
  anonimo: boolean,
  nombre?: string,
  apellido?: string,
  cedula?: string,
  // semillero: string,
}

export interface Estado {
  id: number;
  estado: string;
}

export interface Semilleros {
  id: number,
  name: string,
  id_grupo: number,
  id_lider: number,
  lineaInvestigacion: string,
  descripcion: string,
  logo: string,
}
