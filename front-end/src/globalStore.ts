import { create } from "zustand";

interface GlobalState {
  user_id: string;
  user_name: string;
  setUserId: (value: string) => void;
  setUserName: (value: string) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  user_id: "",
  user_name: "",
  setUserId: (user_id: string) => set({ user_id }),
  setUserName: (user_name: string) => set({ user_name }),
}));
