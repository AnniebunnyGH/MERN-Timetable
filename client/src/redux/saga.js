import { takeEvery, takeLatest } from "redux-saga/effects";
import { creater } from "./types";
import { sagaAddGroup } from "./sagas/addGroup";

export function* helloSaga() {
  console.log("Hello Sagas!");
}

export function* sagaWatcher() {
  yield takeEvery(creater.ADD_GROUP, sagaAddGroup);
}
