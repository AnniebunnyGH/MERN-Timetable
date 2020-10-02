import { combineReducers } from "redux";
import { user } from "./user";
import { auth } from "./auth";
import { creater } from "./creater";
import { app } from "./app";

export const root = combineReducers({
  user,
  auth,
  creater,
  app,
});
