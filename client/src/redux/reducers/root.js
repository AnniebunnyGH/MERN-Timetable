import { combineReducers } from "redux";
import { user } from "./user";
import { auth } from "./auth";
import { creater } from "./creater";

export const root = combineReducers({
  user,
  auth,
  creater,
});
