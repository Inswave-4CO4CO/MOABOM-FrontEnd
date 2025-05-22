import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      userId: null,
      isLogin: false,
      setLogin: (token, userId) =>
        set((state) => ({
          ...state,
          accessToken: token,
          userId: userId,
          isLogin: !!token,
        })),
      setLogout: () =>
        set((state) => ({
          ...state,
          accessToken: null,
          userId: null,
          isLogin: false,
        })),
    }),
    { name: "auth-store", storage: createJSONStorage(() => localStorage) }
  )
);

export default useAuthStore;
