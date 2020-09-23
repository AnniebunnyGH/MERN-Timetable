import { auth } from "../types";

export function login(payload) {
  return {
    type: auth.SET_AUTH,
    payload,
  };
}

export function logout() {
  return {
    type: auth.LOGOUT,
  };
}
