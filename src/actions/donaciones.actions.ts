import {
  doc,
  updateDoc,
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  CollectionReference,
  DocumentData,
} from "firebase/firestore";
import { db } from "../config/firebase/app";
import { Donaciones } from "../domain/entities/donaciones";
import { DonacionesMapper } from "../insfrastructure/mappers/donaciones.mapper";

const donacionesRef: CollectionReference<DocumentData> = collection(
  db,
  "donaciones"
);

export const crearDonacion = async (donacion: Donaciones): Promise<void> => {
  try {
    const docRef = await addDoc(donacionesRef, { ...donacion });
    await updateDoc(docRef, { id: docRef.id });
  } catch (error) {
    throw new Error(`Error al crear la donacion: ${error}`);
  }
};

export const getFirstDonacion = async (): Promise<Donaciones> => {
  try {
    const firstDocSnap = await getDocs(donacionesRef);
    if (!firstDocSnap.empty) {
      const data = firstDocSnap.docs[0].data() as Donaciones;
      return DonacionesMapper.toDomain(data);
    } else {
      throw new Error("No se encontraron donaciones.");
    }
  } catch (error) {
    throw new Error(`Error al obtener la donacion: ${error}`);
  }
};

export const updateDonacion = async (donacion: Donaciones): Promise<void> => {
  try {
    const docRef = doc(donacionesRef, donacion.id);
    await updateDoc(docRef, { ...donacion });
  } catch (error) {
    throw new Error(`Error al actualizar la donacion: ${error}`);
  }
};

// Real-time updates for donations
export const subscribeToDonaciones = (
  callback: (donaciones: Donaciones[]) => void
) => {
  return onSnapshot(donacionesRef, (snapshot) => {
    const donaciones: Donaciones[] = snapshot.docs.map((doc) =>
      DonacionesMapper.toDomain(doc.data() as Donaciones)
    );
    callback(donaciones);
  });
};
