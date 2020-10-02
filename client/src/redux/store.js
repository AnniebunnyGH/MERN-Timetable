import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { root } from "./reducers/root";
import { helloSaga, sagaWatcher } from "./saga";

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  root,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
sagaMiddleware.run(sagaWatcher);
