import axios, { AxiosRequestConfig } from "axios";
import { JWTHeader } from "./ApiTypes";
import { baseUrl } from "./constant";

export const getJWTHeader = (token: string): JWTHeader => {
  return { Authorization: `Bearer ${token}` };
};

const config: AxiosRequestConfig = { baseURL: baseUrl };
export const axiosInstance = axios.create(config);
