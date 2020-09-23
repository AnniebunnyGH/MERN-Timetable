import { auth as initState } from "../initialState";
import { auth as authActionTypes } from "../types";

const storageName = "userData";

export const auth = (state = initState, action) => {
  switch (action.type) {
    case authActionTypes.SET_AUTH:
      localStorage.setItem(
        storageName,
        JSON.stringify({ ...state, ...action.payload })
      );
      return { ...state, ...action.payload, isAuth: true };
    case authActionTypes.LOGOUT:
      localStorage.removeItem(storageName);
      return { ...state, isAuth: false };
    default:
      return state;
  }
};
