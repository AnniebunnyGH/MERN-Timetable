import { SET_USER, REQUEST_USER, ADD_EVENT, ADD_GROUP_USER } from "../types";

export function fetchUserData() {
  return {
    type: REQUEST_USER,
    payload: {
      url: "/api/user/getData",
      method: "GET",
    },
  };
}

export function setUser(payload) {
  return {
    type: SET_USER,
    payload,
  };
}

export function addEvent(payload) {
  return {
    type: ADD_EVENT,
    payload,
  };
}

export function addGroupUser(payload) {
  return {
    type: ADD_GROUP_USER,
    payload,
  };
}
