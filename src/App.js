import Home from "./pages/home";

import Agenda from "./pages/agenda";
import SenateDecisions from "./pages/senateDecisions";
import UpdateHandbook from "./pages/updateHandbook";


import { Routes, Route, Outlet, Link } from "react-router-dom";

export default function App() {
  return (

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="agenda" element={<Agenda />} />
          <Route path="senateDecisions" element={<SenateDecisions />} />
          <Route path="updateHandbook" element={<UpdateHandbook />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          {/* <Route path="*" element={<NoMatch />} /> */}
        </Route>
      </Routes>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}

<nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#"></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                <Link class="nav-link " to="/">Home</Link>
                </li>
                <li class="nav-item">
                <Link class="nav-link " to="/agenda">Agenda</Link>
    
                </li>
                <li class="nav-item ">
                <Link class="nav-link " to="/senateDecisions">Senate Decisions</Link>
                </li>
                <li class="nav-item">
                <Link class="nav-link " to="/updateHandbook">Update Handbook</Link>
                </li>
  
              </ul>
                <button class="btn btn-outline my-2 my-sm-0" type="submit">Logout</button>
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
