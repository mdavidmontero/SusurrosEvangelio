import { NulidadMatrimonial } from "../../domain/entities/nulidad.entities";
import { NulidadMatrimonialDataResponse } from "../interfaces/nulidad";

export class NulidadMatrimonialMapper {
  static toResponse(
    nulidad: NulidadMatrimonial
  ): NulidadMatrimonialDataResponse {
    return {
      nombre: nulidad.nombre,
      apellidos: nulidad.apellidos,
      fechaNacimiento: nulidad.fechaNacimiento,
      correoElectronico: nulidad.correoElectronico,
      telefonoContacto: nulidad.telefonoContacto,
      lugarMatrimonio: nulidad.lugarMatrimonio,
      nombreSacerdoteCelebrante: nulidad.nombreSacerdoteCelebrante,
      duracionConvivencia: nulidad.duracionConvivencia,
      motivoPrincipal: nulidad.motivoPrincipal,
      descripcionMotivo: nulidad.descripcionMotivo,
      certificadoMatrimonio: nulidad.certificadoMatrimonio,
      certificadoBautismo: nulidad.certificadoBautismo,
      pruebasAdicionales: nulidad.pruebasAdicionales,
      consentimiento: nulidad.consentimiento,
    };
  }
}
