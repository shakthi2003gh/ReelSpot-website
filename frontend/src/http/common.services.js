import { toast } from "react-toastify";
import { Provider as http } from "./provider";

const TOKEN = import.meta.env.VITE_TOKEN;

const theme = () => localStorage.getItem(import.meta.env.VITE_THEME);
const getOptions = () => ({
  headers: {
    accept: "application/json",
    [TOKEN]: localStorage.getItem(TOKEN),
  },
});

export function getData(endpoint, options = getOptions()) {
  return new Promise(async (resolve, reject) => {
    http
      .get(endpoint, options)
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        const message = e?.response?.data ?? e.message;

        toast.error(message, { theme: theme() });
        reject(message);
      });
  });
}

export function postData(endpoint, payload = {}, options = getOptions()) {
  return new Promise(async (resolve, reject) => {
    http
      .post(endpoint, payload, options)
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        const message = e?.response?.data ?? e.message;

        toast.error(message, { theme: theme() });
        reject(message);
      });
  });
}

export function deleteData(endpoint, options = getOptions()) {
  return new Promise(async (resolve, reject) => {
    http
      .delete(endpoint, options)
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        const message = e?.response?.data ?? e.message;

        toast.error(message, { theme: theme() });
        reject(message);
      });
  });
}
