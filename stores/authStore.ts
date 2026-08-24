import { create } from "zustand";

type User = { id: string; name: string; email: string } | null;

interface LoggedUser {
  user: User;
  setUser: (user: User) => void;
  //   logout: () => Promise<void>;
  clearUser: () => void;
  isLogged: () => Promise<void>;
}

export const useAuthStore = create<LoggedUser>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  //   logout: async() => {
  //     await fetch("/api/auth/logout" , {method: "POST"})
  //     set({user:null})
  //   },
  clearUser: () => {
    set({ user: null });
  },
  isLogged: async () => {
    try {
      const res = await fetch("/api/auth/me");
      if(res.ok){
        const data = await res.json()
        
        set({user:data.user})
      }else {
        set({user: null})
      }
    } catch (error) {
        set({user: null})
    }
  },
}));
