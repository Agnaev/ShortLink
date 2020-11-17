import React, {useEffect} from 'react'
import {BrowserRouter} from "react-router-dom";
import 'materialize-css';
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./components/Navbar";
import {Loader} from "./components/Loader";
import {useHttp} from "./hooks/http.hook";

function App() {
  const {token, login, logout, userId, ready, storageName} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  const {request} = useHttp();

  useEffect(() => {
    request('/api/auth/verify', "POST", null, {
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem(storageName) || '{}')?.token
    })
      .then(data => {
        if(data.isAuth === false) {
          logout()
        }
      });
  }, [request, logout, storageName]);

  if(!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <BrowserRouter>
        { isAuthenticated && <Navbar/> }
        <div className={"container"}>
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
