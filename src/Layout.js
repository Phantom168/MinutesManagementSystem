import { Outlet, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/agenda">Agenda</Link>
          </li>
          <li>
            <Link to="/senateDecisions">Senate Decisions</Link>
          </li>
          <li>
            <Link to="/updateHandbook">Update Handbook</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;