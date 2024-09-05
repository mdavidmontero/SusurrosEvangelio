import { NulidadMatrimonial } from "../../domain/entities/nulidad.entities";
import { NulidadMatrimonialDataResponse } from "../interfaces/nulidad";

export class NulidadMatrimonialMapper {
  static toResponse(
    nulidad: NulidadMatrimonial
  ): NulidadMatrimonialDataResponse {
    return {
      id: nulidad.id,
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
      certificadoMatrimonioURL: nulidad.certificadoMatrimonioURL,
      certificadoBautismoURL: nulidad.certificadoBautismoURL,
      pruebasAdicionalesURL: nulidad.pruebasAdicionalesURL,
      consentimiento: nulidad.consentimiento,
      estado: nulidad.estado,
    };
  }
}
