import React from 'react';
import '../styles/AdminPage.css'
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Employee from './tabs/Employee';
import Hotel from './tabs/Hotel';
import Room from './tabs/Room';

const AdminPage = () => {
  let { path, url } = useRouteMatch();

  return (

  <div className='admin-page'>
    <div>
      <div>

        <h1>Admin page</h1>
        <table className='admin-menu'>
          <tr>
            <td>
              <Link className="menu-link" to={`${url}/employee`}>Employees</Link>
            </td>
            <td>
              <Link className="menu-link" to={`${url}/hotel`}>Hotels</Link>
            </td>
            <td>
              <Link className="menu-link" to={`${url}/room`}>Rooms</Link>
            </td>
          </tr>
        </table>

        <Switch>
          <Route path={`${path}`} exact component = {Employee} />
          <Route path={`${path}/employee`} component = {Employee} />
          <Route path={`${path}/hotel`} component = {Hotel} />
          <Route path={`${path}/room`} component = {Room} />
        </Switch>

      </div>
    </div>
    
    </div>
  );
}

export default AdminPage;
