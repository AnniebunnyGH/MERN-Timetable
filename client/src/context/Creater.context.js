import { createContext,useState } from 'react'

function noop() { }

export const CreaterContext = createContext({
    users: [],
    groups: [],
    isCreater:false,
    setCreaterMode: noop,
})