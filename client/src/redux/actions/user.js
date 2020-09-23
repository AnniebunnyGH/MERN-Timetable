import { user } from "../types";

export function setUser(payload) {
  return {
    type: user.SET_USER,
    payload,
  };
}

export function addEvent(payload) {
  return {
    type: user.ADD_EVENT,
    payload,
  };
}

export function addGroupUser(payload) {
  return {
    type: user.ADD_GROUP_USER,
    payload,
  };
}
