import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import TimetablePage from './pages/TimetablePage'
import AuthPage from './pages/AuthPage'
import GroupsPage from './pages/GroupsPage'

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path='/timetable' exact>
          <TimetablePage />
        </Route>
        <Route path='/groups' exact>
          <GroupsPage />
        </Route>
        <Redirect to='/timetable' />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path='/' exact>
        <AuthPage />
      </Route>
      <Redirect to='/' />
    </Switch>
  )
}