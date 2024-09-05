// Tipo para un mensaje en el chat
export interface Message {
  message: string;
  timestamp: string;
  uid: string;
}

// Tipo para la conversación en Firestore
export interface Chat {
  messages: Message[];
  users: string[]; // Array de IDs de usuarios
}
