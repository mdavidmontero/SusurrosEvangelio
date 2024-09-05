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
} from "firebase/firestore";
import { db } from "../config/firebase/app";
import { Chat, Message } from "../domain/entities/chat";

const getAdminUid = async (): Promise<string | null> => {
  const usersCollection = collection(db, "usuarios");
  const adminQuery = await getDocs(
    query(usersCollection, where("roles", "==", "ADMIN"))
  );
  const adminDoc = adminQuery.docs[0];

  if (adminDoc) {
    return adminDoc.id;
  }

  console.error("Administrador no encontrado");
  return null;
};

export const sendMessageToAdmin = async (
  uid: string,
  text: string
): Promise<void> => {
  try {
    const adminUid = await getAdminUid();
    if (!adminUid) throw new Error("No se encontró al administrador");

    const chatId = `${uid}_${adminUid}`;
    const chatDocRef = doc(db, "chats", chatId);
    const chatDocSnap = await getDoc(chatDocRef);

    const newMessage: Message = {
      message: text,
      timestamp: new Date().toISOString(),
      uid,
    };

    if (chatDocSnap.exists()) {
      const chatData = chatDocSnap.data();
      const messages = chatData?.messages || [];
      await updateDoc(chatDocRef, {
        messages: [...messages, newMessage],
        hasNewMessages: true,
      });
    } else {
      await setDoc(chatDocRef, {
        chatId,
        messages: [newMessage],
        users: [uid, adminUid],
        hasNewMessages: true,
      });
    }
  } catch (error) {
    console.error("Error al enviar el mensaje:", error);
    throw error;
  }
};

export const getChatsForAdmin = async (adminUid: string): Promise<Chat[]> => {
  try {
    const chatsCollection = collection(db, "chats");
    const q = query(
      chatsCollection,
      where("users", "array-contains", adminUid)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No chats found for the admin.");
      return [];
    }

    const chats: Chat[] = querySnapshot.docs.map((doc) => ({
      chatId: doc.id,
      ...(doc.data() as Omit<Chat, "chatId">),
    }));

    return chats;
  } catch (error) {
    console.error("Error al obtener los chats para el admin:", error);
    throw error;
  }
};

export const sendMessageFromAdmin = async (
  chatId: string,
  adminUid: string,
  text: string
): Promise<void> => {
  try {
    const chatDocRef = doc(db, "chats", chatId);
    const chatDocSnap = await getDoc(chatDocRef);

    const newMessage: Message = {
      message: text,
      timestamp: new Date().toISOString(),
      uid: adminUid,
    };

    if (chatDocSnap.exists()) {
      const chatData = chatDocSnap.data();
      const messages = chatData?.messages || [];
      await updateDoc(chatDocRef, {
        messages: [...messages, newMessage],
        hasNewMessages: false,
      });
    } else {
      console.error("Chat no encontrado");
    }
  } catch (error) {
    console.error("Error al enviar el mensaje:", error);
    throw error;
  }
};

export const getAdmin = async (): Promise<string | null> => {
  const usersCollection = collection(db, "usuarios");
  const adminQuery = await getDocs(
    query(usersCollection, where("roles", "==", "ADMIN"))
  );
  const adminDoc = adminQuery.docs[0];

  if (adminDoc) {
    return adminDoc.id;
  }

  console.error("Administrador no encontrado");
  return null;
};
export const markMessagesAsRead = async (chatId: string): Promise<void> => {
  try {
    const chatDocRef = doc(db, "chats", chatId);
    await updateDoc(chatDocRef, {
      hasNewMessages: false,
    });
  } catch (error) {
    console.error("Error al marcar los mensajes como leídos:", error);
    throw error;
  }
};

export const subscribeToChatsForAdmin = (
  adminUid: string,
  callback: (chats: Chat[]) => void
) => {
  const chatsCollection = collection(db, "chats");
  const q = query(chatsCollection, where("users", "array-contains", adminUid));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const chats: Chat[] = querySnapshot.docs.map((doc) => ({
      chatId: doc.id,
      ...(doc.data() as Omit<Chat, "chatId">),
    }));
    callback(chats);
  });

  return unsubscribe;
};
