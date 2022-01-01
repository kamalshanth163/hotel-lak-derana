import React, { useState } from 'react';
import '../styles/StaffPage.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Attendance from './tabs/Attendance';
import Salary from './tabs/Salary';

const StaffPage = () => {
  let { path, url } = useRouteMatch();

  return (

  <div className='staff-page'>
    <div>
      <div>

        <h1>Staff page</h1>
        <table className='staff-menu'>
          <tr>
            <td>
              <Link className="menu-link" to={`${url}/attendance`}>Attendances</Link>
            </td>
            <td>
              <Link className="menu-link" to={`${url}/salary`}>Salaries</Link>
            </td>
          </tr>
        </table>

        <Switch>
          <Route path={`${path}`} exact component = {Attendance} />
          <Route path={`${path}/attendance`} component = {Attendance} />
          <Route path={`${path}/salary`} component = {Salary} />
        </Switch>

      </div>
    </div>
    
    </div>
  );
}

export default StaffPage;
