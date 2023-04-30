import Home from "./pages/home";
import {useState} from 'react';
import Agenda from "./pages/agenda";
import SenateDecisions from "./pages/senateDecisions";
import UpdateHandbook from "./pages/updateHandbook";
import Login from "./pages/login";
import GoogleLogin from "./pages/GoogleLogin";
import 'bootstrap/dist/css/bootstrap.css';


import { Routes, Route, Outlet, Link, NavLink, Navigate } from "react-router-dom";



export default function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [token, setToken] = useState(false);
  
  return (
<Routes>
        {/* <Route path="/" element={loginStatus ? <Layout /> : <Navigate to="/login" />}/> */}
        <Route path="/login" element={loginStatus ?  <Navigate to="/" /> : <Login />}/>
        <Route path="/accounts" element = {<GoogleLogin setLoginStatus= {setLoginStatus} setToken = {setToken}/>}/>

        <Route path="/" element={loginStatus ? <Layout /> : <Navigate to="/login" />}>
          <Route path="home" index element={loginStatus ? <Home token = {token}/> : <Navigate to="/login" />} />
          <Route path="agenda" element={loginStatus ? <Agenda token = {token}/> : <Navigate to="/login" />} />
          <Route path="senateDecisions" element={loginStatus ? <SenateDecisions token = {token}/> : <Navigate to="/login" />} />
          <Route path="updateHandbook" element={loginStatus ? <UpdateHandbook token = {token}/> : <Navigate to="/login" />} />
          </Route>
          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          {/* <Route path="*" element={<NoMatch />} /> */}
      </Routes>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}

<nav className="navbar navbar-expand-lg navbar-light bg-light" id="navbar">
            <a className="navbar-brand" href="#"></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                <NavLink className="nav-link " to="/home">Home</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link " to="/agenda">Agenda</NavLink>
    
                </li>
                <li className="nav-item ">
                <NavLink className="nav-link " to="/senateDecisions">Senate Decisions</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link " to="/updateHandbook">Update Handbook</NavLink>
                </li>
  
              </ul>
                <button className="btn logout btn-outline my-2 my-sm-0" type="submit" onClick={() => {window.location.reload()}}>Logout</button>
            </div>
          </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}
