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
  DocumentReference,
} from "firebase/firestore";
import { db } from "../config/firebase/app";
import { IglesiaVirtual } from "../domain/entities/virtual";
import { VirtualMapper } from "../insfrastructure/mappers/virtual.mapper";
import { IglesiaVirtualResponse } from "../insfrastructure/interfaces/virtual";

const iglesiaRef: CollectionReference<DocumentData> = collection(db, "iglesia");

export const saveLink = async (virtual: IglesiaVirtual): Promise<void> => {
  try {
    const docRef = await addDoc(iglesiaRef, { virtual });
    await updateDoc(docRef, { id: docRef.id });
  } catch (error) {
    throw new Error(`Error al guardar el enlace: ${error}`);
  }
};

export const getLinksOne = async (): Promise<IglesiaVirtualResponse[]> => {
  try {
    const querySnapshot = await getDocs(iglesiaRef);
    const docs = querySnapshot.docs;
    if (docs.length > 0) {
      return docs.map((virtual) =>
        VirtualMapper.toResponse(virtual.data() as IglesiaVirtual)
      );
    } else {
      return [];
    }
  } catch (error) {
    throw new Error(`Error al obtener el enlace: ${error}`);
  }
};
export const updateLink = async (virtual: IglesiaVirtual): Promise<void> => {
  try {
    const querySnapshot = await getDocs(iglesiaRef);
    const docs = querySnapshot.docs;
    if (docs.length > 0) {
      const docRef = docs[0].ref;
      await updateDoc(docRef, { ...virtual, id: docRef.id });
    } else {
      const docRef = await addDoc(iglesiaRef, { ...virtual });
      await updateDoc(docRef, { id: docRef.id });
    }
  } catch (error) {
    throw new Error(`Error al actualizar el enlace: ${error}`);
  }
};
