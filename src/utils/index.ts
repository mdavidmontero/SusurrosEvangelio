import { Timestamp } from "firebase/firestore";

export const formatHora = (hora: Timestamp | Date | undefined) => {
  if (!hora) return "Hora no disponible";
  if (hora instanceof Timestamp) {
    return new Date(hora.seconds * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return hora.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatFecha = (fecha: Timestamp | Date | undefined) => {
  if (!fecha) return "Fecha no disponible";

  if (fecha instanceof Timestamp) {
    return new Date(fecha.seconds * 1000).toLocaleDateString();
  }

  return fecha.toLocaleDateString();
};

export const services = [
  {
    title: "Misas en Línea",
    description:
      "Transmisiones en vivo de la misa, permitiendo la participación desde cualquier lugar.",
  },
  {
    title: "Oraciones Comunitarias",
    description:
      "Sesiones de oración en grupo, donde los fieles pueden unirse y orar juntos en tiempo real.",
  },
  {
    title: "Asesoria Virtual",
    description:
      "Asesoramiento espiritual a través de chats privados o videollamadas.",
  },
  {
    title: "Catequesis Digital",
    description:
      "Clases y formación religiosa para todas las edades, accesibles en cualquier momento.",
  },
  {
    title: "Asistencia Espiritual",
    description:
      "Consejería y orientación espiritual personalizada mediante chats, foros o videollamadas.",
  },
  {
    title: "Grupos de Estudio Bíblico",
    description:
      "Reuniones virtuales para el estudio y discusión de la Biblia en grupo.",
  },
  {
    title: "Eventos y Retiros Virtuales",
    description:
      "Organizadores de retiros espirituales, conferencias y eventos especiales a través de plataformas digitales.",
  },
  {
    title: "Recursos Litúrgicos",
    description:
      "Acceso a misales, lecturas, reflexiones y otros materiales litúrgicos para uso personal o comunitario.",
  },
];
