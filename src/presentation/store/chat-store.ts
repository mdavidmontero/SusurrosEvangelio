import { create } from "zustand";
import { User } from "../../domain/entities/user";

interface ChatStore {
  friend: User | null;
  setFriend: (friend: User) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  friend: null,
  setFriend: (friend: User) => set({ friend }),
  resetFriend: () => set({ friend: null }),
}));
