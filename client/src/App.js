import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import {useAuth} from './hooks/auth.hook'
import {useCreater} from './hooks/creater.hook'
import {AuthContext} from './context/Auth.context'
import {CreaterContext} from './context/Creater.context'
import {Navbar} from './components/Navbar'
import { useHttp } from './hooks/http.hook'

function App() {
  const { loading, request, error, clearError } = useHttp();
  const {token, login, logout, userId, ready} = useAuth();
  const {isCreater,setCreaterMode} = useCreater();
  const [isAuth, setAuth] = useState(false);
  const [userData,setUserData] = useState({
    userInfo: {},
    groups: {},
    events: [],
  })
  const [createrData, setCreaterData] = useState({ users: [], groups: [] });
  const routes = useRoutes(isAuth);

  useEffect(() =>{
    async function getUserData() {
      const res = await request('/api/user/getData','GET',null,{'Authorization': 'Basic ' + token})
      console.log(res)
      if(res){
        setUserData(res)
        setAuth(true);          
        }  
    }
    if(token){
      console.log(token)
      getUserData()
    } else {
      setAuth(false);       
    }
  },[token])

  useEffect(() => {
    async function getCreaterData() {
      try {
        const data = await request('/api/creater/getData', 'GET',
          null,
          { 'Authorization': 'Basic' + ' ' + token });
        console.log(data);
        setCreaterData(data);
      } catch (e) {

      }
    }
    if(isCreater && token) {
      getCreaterData();
    } 
    
  }, [isCreater,token])


  return (
    <AuthContext.Provider 
    value={{token, login, logout, userId, isAuth,userData}}>
      <CreaterContext.Provider 
      value={{users:createrData.users,groups:createrData.groups,setCreaterMode,isCreater}}>
      <Router>
      <Navbar /> 
        <div className="container">
          {routes}
        </div>
      </Router>
      </CreaterContext.Provider>  
    </AuthContext.Provider>
  )
}

export default App