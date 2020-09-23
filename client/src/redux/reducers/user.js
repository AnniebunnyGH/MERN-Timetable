import { userData as initState } from "../initialState";
import { user as userActionTypes } from "../types";

export const user = (state = initState, action) => {
  const userInfo = state.userInfo;
  const userGroupsList = state.userInfo.groups;
  const userGroups = state.userGroups;
  const userEvents = state.userEvents;
  switch (action.type) {
    case userActionTypes.SET_USER:
      return { ...state, ...action.payload };

    case userActionTypes.ADD_EVENT:
      const eventGroups = action.payload.groups;
      for (let i = 0; i < eventGroups.length; i += 1) {
        if (userGroupsList.include(eventGroups[i])) {
          userEvents.push(action.payload);
          break;
        }
      }
      return { ...state, userEvents };

    case userActionTypes.ADD_GROUP_USER:
      const group = action.payload.group;

      userGroups.created.push(group);
      if (action.payload.isCreaterJoined) {
        userGroups.joined.push(group);
        userGroupsList.push(group.tag);
      }
      return { ...state, userInfo, userGroups };
    default:
      return state;
  }
};
