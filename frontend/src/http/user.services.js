import { getData, postData, deleteData } from "./common.services";

const TOKEN = import.meta.env.VITE_TOKEN;

function postTemplate(path) {
  return function (payload) {
    return new Promise(async (resolve) => {
      postData(path, payload).then((res) => {
        const token = res.headers.get(TOKEN);
        localStorage.setItem(TOKEN, token);

        resolve(res.data);
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
