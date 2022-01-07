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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillAlt, faUserEdit} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';




const StaffPage = () => {
  let { path, url } = useRouteMatch();

  return (

    <div className='staff-page'>

    <div className='sub-options'>
      <NavLink className="menu-link" activeClassName="is-active" to={`${url}/attendance`}><FontAwesomeIcon className='icon' icon={faUserEdit} />Attendances</NavLink>
      <NavLink className="menu-link" activeClassName="is-active" to={`${url}/salary`}><FontAwesomeIcon className='icon' icon={faMoneyBillAlt} />Salaries</NavLink>
    </div>

        <Switch>
          <Route path={`${path}`} exact component = {Attendance} />
          <Route path={`${path}/attendance`} component = {Attendance} />
          <Route path={`${path}/salary`} component = {Salary} />
        </Switch>

</div>

  );
}

export default StaffPage;
