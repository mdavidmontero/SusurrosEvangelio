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

import { Citacion } from "../domain/entities/citacion.entities";
import { CitacionMapper } from "../insfrastructure/mappers/citacion.mapper";

const citacionRef: CollectionReference<DocumentData> = collection(
  db,
  "citacion"
);

export const crearCitacion = async (citacion: Citacion): Promise<void> => {
  try {
    const docRef = await addDoc(citacionRef, citacion);
    await updateDoc(docRef, { id: docRef.id });
  } catch (error) {
    throw new Error(`Error al crear la citación: ${error}`);
  }
};

export const getCitacionById = async (id: string): Promise<Citacion> => {
  try {
    const docRef = doc(citacionRef, id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data() as Citacion;
    return CitacionMapper.fromResponse(data);
  } catch (error) {
    throw new Error(`Error al obtener la citación: ${error}`);
  }
};

export const getcitaciones = async (): Promise<Citacion[]> => {
  try {
    const querySnapshot = await getDocs(citacionRef);
    const citaciones = querySnapshot.docs.map((doc) => doc.data() as Citacion);
    const data = citaciones.map((citacion) =>
      CitacionMapper.fromResponse(citacion)
    );
    return data;
  } catch (error) {
    throw new Error(`Error al obtener las citaciones: ${error}`);
  }
};

export const updateCitacion = async (
  id: string,
  newData: Partial<Citacion>
): Promise<void> => {
  try {
    const docRef = doc(citacionRef, id);
    await updateDoc(docRef, newData);
  } catch (error) {
    throw new Error(`Error al actualizar la citación: ${error}`);
  }
};
