import { create } from "zustand";
import { devtools } from "zustand/middleware";
type User = {
  id: number;
  name: string;
  email: string;
  avatar_url: string;
  login: string;
};

type State = {
  user: Partial<User>;
};

type Action = {
  setUser: (user: User) => void;
};

export const useUserStore = create<State & Action>()(
  devtools((set) => ({
    user: {},
    setUser: (user) => set({ user }),
  }))
);
