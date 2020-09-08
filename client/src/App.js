import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/Auth.context'
import {Navbar} from './components/Navbar'
import { useHttp } from './hooks/http.hook'

function App() {
  const { loading, request, error, clearError } = useHttp();
  const {token, login, logout, userId, ready} = useAuth()
  const [isAuth, setAuth] = useState(false);
  const [userData,setUserData] = useState({
    userInfo: {},
    groups: {},
    events: [],
  })
  const routes = useRoutes(isAuth)

  useEffect(() =>{
    async function getUserData() {
      const res = await request('/api/user/getData','GET',null,{'Authorization': 'Basic ' + token})
      console.log(res)
      if(res){
        setUserData(res)
        setAuth(true);          
        }  
    }
    if(!!token){
      getUserData()
    } else {
      setAuth(false);       
    }
  },[token])

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuth,userData
    }}>
      <Router>
      <Navbar /> 
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App