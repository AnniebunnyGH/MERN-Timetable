import { creater } from "../types";

export function setCreater(payload) {
  return {
    type: creater.SET_CREATER,
    payload,
  };
}

export function addEvent(payload) {
  return {
    type: creater.ADD_EVENT,
    payload,
  };
}

export function addGroup(payload) {
  console.log(payload);
  return {
    type: creater.ADD_GROUP,
    payload,
  };
}

export function addGroupCreater(payload) {
  return {
    type: creater.ADD_GROUP_CREATER,
    payload,
  };
}
