export interface NulidadMatrimonialDataResponse {
  id: string;
  idUsuario: string;
  nombre: string;
  apellidos: string;
  fechaNacimiento: Date;
  correoElectronico: string;
  telefonoContacto: string;
  lugarMatrimonio: string;
  nombreSacerdoteCelebrante: string;
  duracionConvivencia: string;
  motivoPrincipal: string;
  descripcionMotivo: string;
  certificadoMatrimonioURL: File | null;
  certificadoBautismoURL: File | null;
  pruebasAdicionalesURL: File | null;
  consentimiento: boolean;
  estado: string;
}
