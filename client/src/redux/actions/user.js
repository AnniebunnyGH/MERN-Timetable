import { SET_USER, REQUEST_USER } from "../types";

export function fetchUserData() {
  return {
    type: REQUEST_USER,
    payload: {
      url: "/api/user/getData",
      method: "GET",
      nextAction: SET_USER,
    },
  };
}
