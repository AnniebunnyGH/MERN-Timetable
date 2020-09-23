import { put } from "redux-saga/effects";
import { setAuth } from "./actions/auth";
import { addGroup, addGroupCreater, setCreater } from "./actions/creater";
import { addEvent, addGroupUser, setUser } from "./actions/user";
import {
  REQUEST_CREATE_EVENT,
  REQUEST_CREATER,
  REQUEST_LOGIN,
  REQUEST_CREATE_GROUP,
  ADD_GROUP,
  REQUEST_USER,
} from "./types";

export function sagaSwitcher(actionType) {
  switch (actionType) {
    case REQUEST_LOGIN:
      return setAuth;

    case REQUEST_USER:
      return setUser;

    case REQUEST_CREATER:
      return setCreater;

    case REQUEST_CREATE_EVENT:
      return addEvent;

    case REQUEST_CREATE_GROUP:
      return addGroup;

    case ADD_GROUP:
      return [addGroupCreater, addGroupUser];
    default:
      return;
  }
}
