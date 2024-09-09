export const NulidadMatrimonialInitialValues = {
  id: "",
  idUsuario: "",
  nombre: "",
  apellidos: "",
  fechaNacimiento: new Date(),
  correoElectronico: "",
  telefonoContacto: "",
  lugarMatrimonio: "",
  nombreSacerdoteCelebrante: "",
  duracionConvivencia: "",
  motivoPrincipal: "",
  descripcionMotivo: "",
  certificadoMatrimonioURL: null,
  certificadoBautismoURL: null,
  pruebasAdicionalesURL: null,
  consentimiento: false,
  estado: "pendiente",
};

export const CitacionInitialValues = {
  id: "",
  titulo: "",
  descripcion: "",
  fecha: new Date(),
  hora: new Date(),
  lugar: "",
  responsable: "",
};

export const iglesiaVirtualInitialValues = {
  id: "",
  meetLink: "",
  hora: new Date(),
  fecha: new Date(),
};
