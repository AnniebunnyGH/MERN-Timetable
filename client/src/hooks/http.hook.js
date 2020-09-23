import { useState, useCallback } from "react";
import { store } from "../redux/store";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);

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

        const responce = await fetch(url, { method, body, headers });
        const res = await responce.json();

        if (!responce.ok) {
          throw res.message;
        }

        setLoading(false);
        return res.data;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw e.message;
      }
    },
    []
  ); //не ясно

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
