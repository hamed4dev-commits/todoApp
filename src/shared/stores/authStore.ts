import { create } from "zustand";

type User = { id: string; name: string; email: string } | null;

interface LoggedUser {
  user: User;
  setUser: (user: User) => void;
  //   logout: () => Promise<void>;
  clearUser: () => void;
  checkAuth: () => Promise<boolean>;
}

export const useAuthStore = create<LoggedUser>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  //   logout: async() => {
  //     await fetch("/api/auth/logout" , {method: "POST"})
  //     set({user:null})
  //   },
  clearUser: async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    set({ user: null });
  },
  checkAuth: async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        set({ user: data.user });
        return true;
      } else {
        set({ user: null });
        return false;
      }
    } catch (error) {
      set({ user: null });
      return false;
    }
  },
}));
