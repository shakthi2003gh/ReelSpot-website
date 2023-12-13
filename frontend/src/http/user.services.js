import { Provider as http } from "./provider";

const TOKEN = import.meta.env.VITE_TOKEN;

const getOptions = () => ({
  headers: {
    accept: "application/json",
    [TOKEN]: localStorage.getItem(TOKEN),
  },
});

function postTemplate(path) {
  return function (payload) {
    return new Promise(async (resolve, reject) => {
      http
        .post(path, payload)
        .then((res) => {
          const token = res.headers.get(TOKEN);
          localStorage.setItem(TOKEN, token);

          resolve(res.data);
        })
        .catch((e) => {
          reject(e.response.data);
        });
    });
  };
}

export const createUser = postTemplate("/users/new");
export const authUser = postTemplate("/users/auth");

export function verifyUser() {
  return new Promise(async (resolve, reject) => {
    http
      .get("/users/me", getOptions())
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject(e.response.data);
      });
  });
}

export function deleteUser() {
  return new Promise(async (resolve, reject) => {
    http
      .delete("/users/me", getOptions())
      .then(resolve)
      .catch((e) => {
        reject(e.response.data);
      });
  });
}
