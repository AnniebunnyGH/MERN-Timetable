import { userData as initState } from "../initialState";
import { ADD_EVENT, SET_USER, ADD_GROUP_USER } from "../types";

export const user = (state = initState, action) => {
  const userInfo = state.userInfo;
  const userGroupsList = state.userInfo.groups;
  const userGroups = state.userGroups;
  const userEvents = state.userEvents;
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload };

    case ADD_EVENT:
      const eventGroups = action.payload.groups;
      for (let i = 0; i < eventGroups.length; i += 1) {
        if (userGroupsList.include(eventGroups[i])) {
          userEvents.push(action.payload);
          break;
        }
      }
      return { ...state, userEvents };

    case ADD_GROUP_USER:
      const group = action.payload;
      userGroups.push(group);
      userInfo.groups.push(group.tag);
      return { ...state, userInfo, userGroups };
    default:
      return state;
  }
};
