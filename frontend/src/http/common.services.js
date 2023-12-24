import { Provider as http } from "./provider";

const TOKEN = import.meta.env.VITE_TOKEN;

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
        reject(e.response.data);
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
        reject(e.response.data);
      });
  });
}
