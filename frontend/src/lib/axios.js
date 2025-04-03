import axios from "axios";
import { backendURL } from "../../../url.js";

export const axiosInstance = axios.create({
  baseURL: backendURL, // Use your server's IP
  withCredentials: true, // Important for sending cookies
  headers: {
    "Content-Type": "application/json",
  },
});
