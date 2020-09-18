import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRoutes } from "./routes";
import { Navbar } from "./components/Navbar";
import { fetchUserData } from "./redux/actions/user";
import { fetchCreaterData } from "./redux/actions/creater";
import { setAuth } from "./redux/actions/auth";

const storageName = "userData";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const routes = useRoutes(auth.isAuth);

  useEffect(() => {
    async function getUserData() {
      dispatch(fetchUserData());
      dispatch(fetchCreaterData());
    }
    if (auth.isAuth) {
      getUserData();
    } else {
      const data = JSON.parse(localStorage.getItem(storageName));
      if (data && data.token) {
        dispatch(setAuth(data)); //Нужно бы проверить токен на жизнеспособность
      }
    }
  }, [auth.isAuth]);

  return (
    <Router>
      <Navbar />
      <div className="container">{routes}</div>
    </Router>
  );
}

export default App;
