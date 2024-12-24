import { devtools } from "zustand/middleware";
import { createStore } from "zustand/vanilla";
export type User = {
  id: number;
  userName: string;
  email: string;
  avatar: string;
  nickName: string;
};

type State = {
  user: Partial<User>;
};

type Action = {
  setUser: (user: User) => void;
};

export const defaultInitState: State = {
  user: {},
};

export type UserStore = State & Action;

export const createUserStore = (initState: State = defaultInitState) => {
  return createStore<UserStore>()(
    devtools((set) => ({
      ...initState,
      setUser: (user) => set({ user }),
    }))
  );
};
