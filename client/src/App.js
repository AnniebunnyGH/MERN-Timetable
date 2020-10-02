import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRoutes } from "./routes";
import { Navbar } from "./components/Navbar";
import { setUser } from "./redux/actions/user";
import { setCreater } from "./redux/actions/creater";
import { login, logout } from "./redux/actions/auth";
import { useHttp } from "./hooks/http.hook";

const storageName = "userData";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const routes = useRoutes(auth.isAuth);
  const { loading, request, error, clearError } = useHttp();

  useEffect(() => {
    async function getUserData() {
      try {
        const user = await request("/api/user/getData", "GET");
        dispatch(setUser(user));
        const creater = await request("/api/creater/getData", "GET");
        dispatch(setCreater(creater));
      } catch (e) {
        dispatch(logout());
      }
    }
    if (auth.isAuth) {
      getUserData();
    } else {
      const data = JSON.parse(localStorage.getItem(storageName));
      if (data && data.token) {
        dispatch(login(data)); //Нужно бы проверить токен на жизнеспособность
      }
    }
  }, [auth.isAuth]);

  return (
    <Router>
      <Navbar />
      <div>{routes}</div>
    </Router>
  );
}

export default App;
