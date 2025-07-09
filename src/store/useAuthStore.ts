/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  init: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,

  init: () => {
    const token = localStorage.getItem("auth_token");
    const userData = localStorage.getItem("user_data");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        set({ user: parsedUser, isAuthenticated: true, loading: false });
      } catch {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_data");
        set({ user: null, isAuthenticated: false, loading: false });
      }
    } else {
      set({ loading: false });
    }
  },

  login: async (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      const userData = { id: user.id, email: user.email, name: user.name };
      const token = `token_${Date.now()}_${Math.random()}`;
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user_data", JSON.stringify(userData));
      set({ user: userData, isAuthenticated: true });
      return true;
    }

    return false;
  },

  register: async (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u: any) => u.email === email)) return false;

    const newUser = {
      id: `user_${Date.now()}_${Math.random()}`,
      name,
      email,
      password,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    return true;
  },

  logout: () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    set({ user: null, isAuthenticated: false });
  },
}));
