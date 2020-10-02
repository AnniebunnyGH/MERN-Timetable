import { app as initState } from "../initialState";
import { app as actionTypes } from "../types";

export const app = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_PAGE:
      return { ...state, currentPage: action.payload };
    case actionTypes.SET_SCHEDULE_MOD:
      return { ...state, scheduleMod: action.payload };
    default:
      return state;
  }
};
