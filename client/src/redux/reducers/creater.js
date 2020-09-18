import { createrData as initState } from "../initialState";
import { SET_CREATER } from "../types";

export const creater = (state = initState, action) => {
  switch (action.type) {
    case SET_CREATER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
