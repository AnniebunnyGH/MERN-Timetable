import { store } from "../redux/store";

export const request = async (
  url,
  method = "GET",
  body = null,
  headers = {}
) => {
  try {
    const state = store.getState();
    const token = state.auth.token;
    if (token) {
      headers["Authorization"] = "Basic " + token;
    }
    if (body) {
      body = JSON.stringify(body);
      headers["Content-Type"] = "application/json";
    }

    const res = await fetch(url, { method, body, headers });
    const data = await res.json();

    if (!res.ok) {
      throw data; //Обработчик ошибок
    }

    return data;
  } catch (e) {}
};
