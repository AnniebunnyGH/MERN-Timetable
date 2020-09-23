import { put, all } from "redux-saga/effects";
import { addGroupCreater } from "../actions/creater";
import { addGroupUser } from "../actions/user";

export function* sagaAddGroup(action) {
  yield all([
    put(addGroupUser(action.payload)),
    put(addGroupCreater(action.payload)),
  ]);
}
