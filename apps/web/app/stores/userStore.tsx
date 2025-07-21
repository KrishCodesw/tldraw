import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: number;
  name: string;
  email: string;
};

type State = {
  user: User | null;
  token: string | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  setToken: (token: string) => void;
  clearToken: () => void;
};

export const useUserStore = create<State>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null }),
    }),
    {
      name: "user-storage", // localStorage key
    }
  )
);
