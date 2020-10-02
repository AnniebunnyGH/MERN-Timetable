import { app } from "../types";

export function setScheduleMod(payload) {
  return {
    type: app.SET_SCHEDULE_MOD,
    payload,
  };
}

export function setPage(payload) {
  return {
    type: app.SET_PAGE,
    payload,
  };
}
