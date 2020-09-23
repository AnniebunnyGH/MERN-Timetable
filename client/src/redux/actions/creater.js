import {
  SET_CREATER,
  REQUEST_CREATER,
  REQUEST_CREATE_EVENT,
  REQUEST_CREATE_GROUP,
  ADD_EVENT,
  ADD_GROUP,
  ADD_GROUP_CREATER,
} from "../types";

export function fetchCreaterData() {
  return {
    type: REQUEST_CREATER,
    payload: {
      url: "/api/creater/getData",
      method: "GET",
    },
  };
}

export function setCreater(payload) {
  return {
    type: SET_CREATER,
    payload,
  };
}

export function fetchCreateEvent(payload) {
  return {
    type: REQUEST_CREATE_EVENT,
    payload: {
      url: "/api/creater/createEvent",
      method: "POST",
      body: payload,
    },
  };
}

export function addEvent(payload) {
  return {
    type: ADD_EVENT,
    payload,
  };
}

export function fetchCreateGroup(payload) {
  return {
    type: REQUEST_CREATE_GROUP,
    payload: {
      url: "/api/creater/createGroup",
      method: "POST",
      body: payload,
    },
  };
}

export function addGroup(payload) {
  return {
    type: ADD_GROUP,
    payload,
  };
}

export function addGroupCreater(payload) {
  return {
    type: ADD_GROUP_CREATER,
    payload,
  };
}
