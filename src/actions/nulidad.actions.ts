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
    const certificadoMatrimonio = await subirarchivos(
      solicitud.certificadoMatrimonioURL,
      "certificadoMatrimonio"
    );
    const certificadoBautismo = await subirarchivos(
      solicitud.certificadoBautismoURL,
      "certificadoBautismo"
    );
    const pruebasAdicionales = await subirarchivos(
      solicitud.pruebasAdicionalesURL,
      "pruebasAdicionales"
    );
    const solicitudConURLs = {
      ...solicitud,
      certificadoMatrimonio,
      certificadoBautismo,
      pruebasAdicionales,
    };

    const {
      certificadoMatrimonioURL,
      certificadoBautismoURL,
      pruebasAdicionalesURL,
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

export const getNulidadMatrimonial = (
  callback: (data: NulidadMatrimonialDataResponse[]) => void
): (() => void) => {
  return onSnapshot(nulidadRef, (querySnapshot) => {
    const nulidadData = querySnapshot.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          id: doc.id,
        } as NulidadMatrimonial)
    );
    const data = nulidadData.map((nulidad) =>
      NulidadMatrimonialMapper.toResponse(nulidad)
    );
    callback(data);
  });
};

export const getNulidadMatrimonialById = async (
  id: string
): Promise<NulidadMatrimonialDataResponse | null> => {
  const docRef = doc(nulidadRef, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const nulidadData = docSnap.data() as NulidadMatrimonial;
    return NulidadMatrimonialMapper.toResponse(nulidadData);
  }
  return null;
};

export const actualizarEstadoNulidad = async (
  id: string,
  estado: string
): Promise<void> => {
  const docRef = doc(nulidadRef, id);
  await updateDoc(docRef, { estado });
};
