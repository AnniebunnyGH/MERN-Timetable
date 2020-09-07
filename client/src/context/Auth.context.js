import { createContext } from 'react'

function noop() { }

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuth: false,
  user: {
    fname: null,
    sname: null,
    right: null,
  },
  userEvents: null,
  userGroups: null,
})