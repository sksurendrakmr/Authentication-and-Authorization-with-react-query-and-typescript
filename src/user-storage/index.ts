import { User } from "../api/ApiTypes";

const USER_LOCALSTORAGE_KEY = "user-token";

export const getStoredUser = (): User | null => {
  const storedUser = localStorage.getItem(USER_LOCALSTORAGE_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
};

export const setStoredUser = (user: User) => {
  localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
};

export const clearStoredUser = () => {
  localStorage.removeItem(USER_LOCALSTORAGE_KEY);
};
