import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { firebaseApp, firebaseAuth } from "../../services/firebase/config";
import { useUserStore } from "@/stores/useUserStore";
const { setAccessToken, setRefreshToken, setEmail, resetStore } =
  useUserStore.getState();

export const checkUserState = () => {
  if (typeof window !== "undefined") {
    const auth = getAuth(firebaseApp);
    const user = auth.currentUser;
    const { accessToken } = useUserStore.getState();

    if (user || accessToken) {
      return true;
    }
  }

  return false;
};

export const register = async (email: string, password: string) => {
  try {
    const response = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const response = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );

    const accessToken = await response.user.getIdToken(true);
    const refreshToken = response.user.refreshToken;

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setEmail(email);

    return response;
  } catch (error) {
    return error;
  }
};

export const logout = async () => {
  try {
    const response = await signOut(firebaseAuth);
    resetStore();
    return response;
  } catch (error) {
    return error;
  }
};
