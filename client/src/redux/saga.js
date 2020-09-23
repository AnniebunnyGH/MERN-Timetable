import { takeEvery, put, call } from "redux-saga/effects";
import {
  REQUEST_LOGIN,
  REQUEST_LOGON,
  REQUEST_USER,
  REQUEST_CREATER,
  REQUEST_CREATE_EVENT,
  REQUEST_CREATE_GROUP,
  ADD_GROUP,
} from "./types";
import { request } from "../services/request";
import { sagaSwitcher } from "./sagaSwitcher";

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
  yield takeEvery(ADD_GROUP, sagaBranchedRouter);
}

export function* sagaBranchedRouter(action) {
  const payload = action.payload;
  const nextActions = sagaSwitcher(action.type);
  if (nextActions) {
    for (let i = 0; i < nextActions.length; i += 1) {
      yield put(nextActions[i](payload));
    }
  }
}

export function* sagaRequest(action) {
  const data = action.payload;
  const res = yield call(async () => {
    const res = await request(data.url, data.method, data.body, data.headers);
    return await res;
  });
  console.log(action.type, res);
  const nextAction = sagaSwitcher(action.type);
  if (nextAction) {
    yield put(nextAction(res));
  }
}
