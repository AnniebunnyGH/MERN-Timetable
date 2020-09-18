import { LOGOUT, REQUEST_LOGIN, REQUEST_LOGON, SET_AUTH } from "../types";

export function login(payload) {
  return {
    type: REQUEST_LOGIN,
    payload: {
      url: "/api/auth/login",
      method: "POST",
      body: payload,
      nextAction: SET_AUTH,
    },
  };
}

export function logon(payload) {
  return {
    type: REQUEST_LOGON,
    payload: {
      url: "/api/auth/register",
      method: "POST",
      body: payload,
    },
  };
}

export function setAuth(payload) {
  return {
    type: SET_AUTH,
    payload,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
