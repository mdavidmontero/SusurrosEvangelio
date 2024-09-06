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

const iglesiaRef: CollectionReference<DocumentData> = collection(db, "iglesia");

export const saveLink = async (link: string): Promise<void> => {
  try {
    const docRef = await addDoc(iglesiaRef, { link });
    await updateDoc(docRef, { id: docRef.id });
  } catch (error) {
    throw new Error(`Error al guardar el enlace: ${error}`);
  }
};

export const getLinksOne = async (): Promise<string[]> => {
  try {
    const querySnapshot = await getDocs(iglesiaRef);
    const docs = querySnapshot.docs;
    if (docs.length > 0) {
      return docs.map((doc) => doc.data().link);
    } else {
      return [];
    }
  } catch (error) {
    throw new Error(`Error al obtener el enlace: ${error}`);
  }
};
export const updateLink = async (link: string): Promise<void> => {
  try {
    const querySnapshot = await getDocs(iglesiaRef);
    const docs = querySnapshot.docs;
    if (docs.length > 0) {
      const docRef = docs[0].ref;
      await updateDoc(docRef, { link });
    } else {
      await addDoc(iglesiaRef, { link });
    }
  } catch (error) {
    throw new Error(`Error al actualizar el enlace: ${error}`);
  }
};
