import {
  doc,
  updateDoc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  setDoc,
  CollectionReference,
  DocumentData,
} from "firebase/firestore";
import { storage } from "../config/firebase/app";
import { db } from "../config/firebase/app";
import { EvangelizacionData } from "../domain/entities/evangelizacion";
import { EvangelizacionMapper } from "../insfrastructure/mappers/evangelizacion.mapper";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const evangelizacionRef: CollectionReference<DocumentData> = collection(
  db,
  "evangelizacion"
);

export const uploadImage = async (image: string): Promise<string> => {
  try {
    const response = await fetch(image);
    const blob = await response.blob();

    const storageRef = ref(
      storage,
      `evangelizacion/${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 9)}.jpg` // Ensure the image is saved with a proper extension
    );

    await uploadBytes(storageRef, blob);

    const url = await getDownloadURL(storageRef);

    return url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const crearEvangelizacion = async (
  evangelizacion: EvangelizacionData
): Promise<void> => {
  try {
    const imageUrl = await uploadImage(evangelizacion.imagenPalabraDelDia);

    const existingEvangelizaciones = await getEvangelizacionByDate(
      evangelizacion.createdAt
    );

    if (existingEvangelizaciones.length > 0) {
      const docRef = doc(evangelizacionRef, existingEvangelizaciones[0].id);
      const updatedData = EvangelizacionMapper.toDomain({
        ...evangelizacion,
        imagenPalabraDelDia: imageUrl,
      });
      await updateDoc(docRef, {
        ...updatedData,
        id: existingEvangelizaciones[0].id,
      });
    } else {
      const newDocRef = await addDoc(evangelizacionRef, {
        ...evangelizacion,
        imagenPalabraDelDia: imageUrl,
      });
      await setDoc(newDocRef, { id: newDocRef.id }, { merge: true });
    }
  } catch (error) {
    throw new Error(`Error al crear la evangelización: ${error}`);
  }
};
export const getEvangelizacionesAll = async (): Promise<
  EvangelizacionData[]
> => {
  try {
    const querySnapshot = await getDocs(evangelizacionRef);
    const evangelizaciones = querySnapshot.docs
      .map((doc) => doc.data() as EvangelizacionData)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 10);
    return evangelizaciones;
  } catch (error) {
    throw new Error(`Error al obtener las evangelizaciones: ${error}`);
  }
};

export const getEvangelizacionById = async (
  id: string
): Promise<EvangelizacionData> => {
  try {
    const docRef = doc(evangelizacionRef, id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data() as EvangelizacionData;
    return data;
  } catch (error) {
    throw new Error(`Error al obtener la evangelización: ${error}`);
  }
};

export const getEvangelizacionByDate = async (
  date: string
): Promise<EvangelizacionData[]> => {
  try {
    const querySnapshot = await getDocs(evangelizacionRef);
    const evangelizaciones = querySnapshot.docs
      .map((doc) => doc.data() as EvangelizacionData)
      .filter((evangelizacion) => {
        const creationDate = new Date(evangelizacion.createdAt).toDateString();
        return creationDate === new Date(date).toDateString();
      });
    return evangelizaciones;
  } catch (error) {
    throw new Error(`Error al obtener las evangelizaciones: ${error}`);
  }
};
