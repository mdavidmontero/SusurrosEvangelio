import { EvangelizacionData } from "../../domain/entities/evangelizacion";
import { EvangelizacionDataResponse } from "../interfaces/evangelizacion";

export class EvangelizacionMapper {
  static toDomain(
    evangelizacion: EvangelizacionData
  ): EvangelizacionDataResponse {
    return {
      id: evangelizacion.id,
      tituloPalabraDelDia: evangelizacion.tituloPalabraDelDia,
      contenidoPalabraDelDia: evangelizacion.contenidoPalabraDelDia,
      imagenPalabraDelDia: evangelizacion.imagenPalabraDelDia,
      tituloReflexionDiaria: evangelizacion.tituloReflexionDiaria,
      contenidoReflexionDiaria: evangelizacion.contenidoReflexionDiaria,
      videoUrlReflexionDiaria: evangelizacion.videoUrlReflexionDiaria,
      createdAt: evangelizacion.createdAt,
      updatedAt: evangelizacion.updatedAt,
    };
  }
}
