import { createrData as initState } from "../initialState";
import { creater as createrActionTypes } from "../types";

export const creater = (state = initState, action) => {
  const groups = state.groups;
  switch (action.type) {
    case createrActionTypes.SET_CREATER:
      return { ...state, ...action.payload };
    case createrActionTypes.ADD_GROUP_CREATER: {
      groups.push(action.payload.group);
      return { ...state, groups };
    }
    default:
      return state;
  }
};
