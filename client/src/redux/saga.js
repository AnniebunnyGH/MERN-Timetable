import { takeEvery, put, call } from "redux-saga/effects";
import {
  REQUEST_LOGIN,
  REQUEST_LOGON,
  REQUEST_USER,
  REQUEST_CREATER,
  REQUEST_CREATE_EVENT,
  REQUEST_CREATE_GROUP,
} from "./types";
import { request } from "../services/request";

export function* helloSaga() {
  console.log("Hello Sagas!");
}

export function* sagaWatcher() {
  yield takeEvery(REQUEST_LOGIN, sagaRequest);
  yield takeEvery(REQUEST_LOGON, sagaRequest);
  yield takeEvery(REQUEST_USER, sagaRequest);
  yield takeEvery(REQUEST_CREATER, sagaRequest);
  yield takeEvery(REQUEST_CREATE_EVENT, sagaRequest);
  yield takeEvery(REQUEST_CREATE_GROUP, sagaRequest);
}

export function* sagaRequest(action) {
  const data = action.payload;
  const res = yield call(async () => {
    const res = await request(data.url, data.method, data.body, data.headers);
    return res;
  });
  if (data.nextAction) {
    yield put({ type: data.nextAction, payload: res });
  }
}
