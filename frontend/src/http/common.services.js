import { Provider as http } from "./provider";
import { ErrorHandler } from "../error/handler";

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
      .catch((e) => ErrorHandler.handle(e, reject));
  });
}

export function postData(endpoint, payload = {}, options = getOptions()) {
  return new Promise(async (resolve, reject) => {
    http
      .post(endpoint, payload, options)
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => ErrorHandler.handle(e, reject));
  });
}

export function deleteData(endpoint, options = getOptions()) {
  return new Promise(async (resolve, reject) => {
    http
      .delete(endpoint, options)
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => ErrorHandler.handle(e, reject));
  });
}
