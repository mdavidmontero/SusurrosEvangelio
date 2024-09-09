import { Donaciones } from "../../domain/entities/donaciones";
import { DonacionesResponse } from "../interfaces/donaciones";

export class DonacionesMapper {
  static toDomain(donaciones: Donaciones): DonacionesResponse {
    return {
      id: donaciones.id,
      linkPago: donaciones.linkPago,
      valor: donaciones.valor,
    };
  }
}
