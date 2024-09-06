import { CitacionResponse } from "../interfaces/citacion";
import { Citacion } from "../../domain/entities/citacion.entities";

export class CitacionMapper {
  static fromResponse(citacion: CitacionResponse): Citacion {
    return {
      id: citacion.id,
      titulo: citacion.titulo,
      descripcion: citacion.descripcion,
      fecha: citacion.fecha,
      hora: citacion.hora,
      lugar: citacion.lugar,
      responsable: citacion.responsable,
    };
  }
}
