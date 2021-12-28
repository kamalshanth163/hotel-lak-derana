import React, { useState } from 'react';
import '../styles/Admin.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Member from './tabs/Employee';
import Hotel from './tabs/Hotel';
import Room from './tabs/Room';

const Admin = () => {
  let { path, url } = useRouteMatch();

  return (

  <div className='admin-page'>
    <div>
      <div>
        <h2>Admin page</h2>
        <ul className='sub-links'>
          <li>
            <Link to={`${url}/employee`}>Employees</Link>
          </li>
          <li>
            <Link to={`${url}/hotel`}>Hotels</Link>
          </li>
          <li>
            <Link to={`${url}/room`}>Rooms</Link>
          </li>
        </ul>

        <Switch>
          <Route path={`${path}`} exact component = {Member} />
          <Route path={`${path}/employee`} component = {Member} />
          <Route path={`${path}/hotel`} component = {Hotel} />
          <Route path={`${path}/room`} component = {Room} />
        </Switch>

      </div>
    </div>
    
    </div>
  );
}

export default Admin;
