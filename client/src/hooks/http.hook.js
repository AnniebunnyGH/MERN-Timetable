import { useState, useCallback, useContext } from "react";
import { useAuth } from "./auth.hook";
import { AuthContext } from "../context/Auth.context";

export const useHttp = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }

        const responce = await fetch(url, { method, body, headers });
        const data = await responce.json();
        if (!responce.ok) {
          throw data;
        }
        setLoading(false);
        return data;
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
