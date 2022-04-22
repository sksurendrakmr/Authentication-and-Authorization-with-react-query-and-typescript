import { UserResponseType } from "../hooks/types";

const USER_LOCALSTORAGE_KEY = "user-token";

export const getStoredUser = (): UserResponseType | null => {
  const storedUser = localStorage.getItem(USER_LOCALSTORAGE_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
};

export const setStoredUser = (user: UserResponseType) => {
  localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
};

export const clearStoredUser = () => {
  localStorage.removeItem(USER_LOCALSTORAGE_KEY);
};
