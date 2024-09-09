export interface Message {
  message: string;
  timestamp: string;
  uid: string;
}

export interface Chat {
  messages: Message[];
  users: string[];
}
