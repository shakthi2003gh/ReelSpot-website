import axios from "axios";

export const Provider = axios.create({
  baseURL: import.meta.env.VITE_ENDPOINT,
  headers: {
    accept: "application/json",
  },
});
