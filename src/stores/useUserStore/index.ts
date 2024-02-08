import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  accessToken: string;
  refreshToken: string;
  email: string;
};

type Action = {
  setAccessToken: (access_token: User["accessToken"]) => void;
  setRefreshToken: (access_token: User["refreshToken"]) => void;
  setEmail: (email: User["email"]) => void;
  resetStore: () => void;
};

export const useUserStore = create(
  persist<User & Action>(
    (set) => ({
      accessToken: "",
      refreshToken: "",
      email: "",
      setAccessToken: (accessToken) => set({ accessToken: accessToken }),
      setRefreshToken: (refreshToken) => set({ refreshToken: refreshToken }),
      setEmail: (email) => set({ email: email }),
      resetStore: () => {
        set({
          accessToken: "",
          refreshToken: "",
          email: "",
        });
      },
    }),
    {
      name: "user-data",
    }
  )
);
