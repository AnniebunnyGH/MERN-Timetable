import { scheduleTimingMods } from "../constants/pageStates";
import { pages } from "../constants/pages";

export const userData = {
  userInfo: { fname: "", sname: "", rights: "", groups: [] },
  userGroups: { created: [], joined: [] },
  userEvents: [],
};

export const auth = {
  token: null,
  isAuth: false,
};

export const createrData = {
  groups: [],
  users: [],
};

export const app = {
  currentPage: pages.schedule,
  scheduleMod: scheduleTimingMods.day,
  scheduleDay: 12,
  scheduleWeek: 12,
  scheduleMonth: 12,
};
