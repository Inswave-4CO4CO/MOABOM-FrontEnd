import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      isLogin: false,
      setLogin: (token) =>
        set((state) => ({ ...state, accessToken: token, isLogin: !!token })),
      setLogout: () =>
        set((state) => ({ ...state, accessToken: null, isLogin: false })),
    }),
    { name: "auth-store", storage: createJSONStorage(() => localStorage) }
  )
);

export default useAuthStore;
