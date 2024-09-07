import { IglesiaVirtual } from "../../domain/entities/virtual";
import { IglesiaVirtualResponse } from "../interfaces/virtual";

export class VirtualMapper {
  static toResponse(virtual: IglesiaVirtual): IglesiaVirtualResponse {
    return {
      id: virtual.id,
      meetLink: virtual.meetLink,
      hora: virtual.hora,
      fecha: virtual.fecha,
    };
  }
}
