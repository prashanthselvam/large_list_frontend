import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Root() {
    return (
      <>
        <ToastContainer />
        <div id="sidebar">
          <h1>Big List</h1>
          <nav>
            <ul>
              <li>
                <Link to={`/search`}>Company Search</Link>
              </li>
              <li>
                <Link to={`/lists`}>Lists</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div id="detail">
            <Outlet />
        </div>
      </>
    );
  }