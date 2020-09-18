import {
  SET_CREATER,
  REQUEST_CREATER,
  REQUEST_CREATE_EVENT,
  REQUEST_CREATE_GROUP,
} from "../types";

export function fetchCreaterData() {
  return {
    type: REQUEST_CREATER,
    payload: {
      url: "/api/creater/getData",
      method: "GET",
      nextAction: SET_CREATER,
    },
  };
}

export function fetchCreateEvent(payload) {
  return {
    type: REQUEST_CREATE_EVENT,
    payload: {
      url: "/api/creater/createEvent",
      method: "POST",
      body: payload,
      nextAction: null,
    },
  };
}

export function fetchCreateGroup(payload) {
  return {
    type: REQUEST_CREATE_GROUP,
    payload: {
      url: "/api/creater/createGroup",
      method: "POST",
      body: payload,
      nextAction: null,
    },
  };
}
