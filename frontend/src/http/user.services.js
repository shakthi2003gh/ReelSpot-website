import { Provider as http } from "./provider";
import { getData, deleteData } from "./common.services";
import { toast } from "react-toastify";

const TOKEN = import.meta.env.VITE_TOKEN;
const theme = () => localStorage.getItem(import.meta.env.VITE_THEME);

function postTemplate(path) {
  return function (payload) {
    return new Promise(async (resolve) => {
      http
        .post(path, payload)
        .then((res) => {
          const token = res.headers.get(TOKEN);
          localStorage.setItem(TOKEN, token);

          resolve(res.data);
        })
        .catch((e) => {
          const message = e?.response?.data ?? e.message;

          toast.error(message, { theme: theme() });
          reject(message);
        });
    });
  };
}

export const createUser = postTemplate("/users/new");
export const authUser = postTemplate("/users/auth");

export function verifyUser() {
  return getData("/users/me");
}

export function deleteUser() {
  return deleteData("/users/me");
}
