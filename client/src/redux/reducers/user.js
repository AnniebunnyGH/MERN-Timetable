import { userData as initState } from "../initialState";
import { SET_USER } from "../types";

export const user = (state = initState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
