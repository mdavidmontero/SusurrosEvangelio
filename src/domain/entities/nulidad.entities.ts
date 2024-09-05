export interface NulidadMatrimonial {
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
  certificadoMatrimonio: File | null;
  certificadoBautismo: File | null;
  pruebasAdicionales: File | null;
  consentimiento: boolean;
}
