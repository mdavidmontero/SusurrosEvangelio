import {
  doc,
  updateDoc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  setDoc,
  onSnapshot,
  CollectionReference,
  DocumentData,
} from "firebase/firestore";
import { db } from "../config/firebase/app";
import { NulidadMatrimonial } from "../domain/entities/nulidad.entities";
import { NulidadMatrimonialMapper } from "../insfrastructure/mappers/nulidad.mapper";
import { NulidadMatrimonialDataResponse } from "../insfrastructure/interfaces/nulidad";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export const subirarchivos = async (
  archivo: File | null,
  id: string
): Promise<string | null> => {
  if (!archivo) return null;

  if (archivo.type !== "application/pdf") {
    throw new Error("El archivo debe ser un PDF.");
  }

  const storage = getStorage();
  const storageRef = ref(storage, `nulidad/${id}/${archivo.name}`);

  const metadata = {
    contentType: "application/pdf",
    size: archivo.size,
    name: archivo.name,
  };

  const snapshot = await uploadBytesResumable(storageRef, archivo, metadata);
  return await getDownloadURL(snapshot.ref);
};

const nulidadRef: CollectionReference<DocumentData> = collection(db, "nulidad");

export const enviarSolicitudNulidad = async (
  solicitud: NulidadMatrimonial
): Promise<NulidadMatrimonialDataResponse> => {
  try {
    const certificadoMatrimonioURL = await subirarchivos(
      solicitud.certificadoMatrimonio,
      "certificadoMatrimonio"
    );
    const certificadoBautismoURL = await subirarchivos(
      solicitud.certificadoBautismo,
      "certificadoBautismo"
    );
    const pruebasAdicionalesURL = await subirarchivos(
      solicitud.pruebasAdicionales,
      "pruebasAdicionales"
    );
    const solicitudConURLs = {
      ...solicitud,
      certificadoMatrimonioURL,
      certificadoBautismoURL,
      pruebasAdicionalesURL,
    };

    const {
      certificadoMatrimonio,
      certificadoBautismo,
      pruebasAdicionales,
      ...solicitudSinArchivos
    } = solicitudConURLs;

    const docRef = await addDoc(nulidadRef, solicitudSinArchivos);

    const docSnap = await getDoc(docRef);
    const nulidadData = docSnap.data() as NulidadMatrimonial;

    const respuesta = NulidadMatrimonialMapper.toResponse(nulidadData);
    return respuesta;
  } catch (error) {
    console.error(
      "Error al enviar la solicitud de nulidad matrimonial:",
      error
    );
    throw new Error("Error al enviar la solicitud de nulidad matrimonial");
  }
};
