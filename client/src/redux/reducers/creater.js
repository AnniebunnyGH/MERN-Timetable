import { createrData as initState } from "../initialState";
import { ADD_GROUP_CREATER, SET_CREATER } from "../types";

export const creater = (state = initState, action) => {
  const groups = state.groups;
  switch (action.type) {
    case SET_CREATER:
      return { ...state, ...action.payload };
    case ADD_GROUP_CREATER: {
      groups.push(action.payload);
      return { ...state, groups };
    }
    default:
      return state;
  }
};
