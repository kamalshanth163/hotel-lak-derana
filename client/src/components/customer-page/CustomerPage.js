import React, { useState } from 'react';
import '../styles/CustomerPage.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Customer from './tabs/Customer';
import Reservation from './tabs/Reservation';
import Payment from './tabs/Payment';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers,faCalendarCheck ,faMoneyCheckAlt} from '@fortawesome/free-solid-svg-icons';


const CustomerPage = () => {
  let { path, url } = useRouteMatch();

  return (

  <div className='customer-page'>

    <div className='sub-options'>
      <NavLink className="menu-link" activeClassName="is-active" to={`${url}/customer`}><FontAwesomeIcon className='icon' icon={faUsers} />Customers</NavLink>
      <NavLink className="menu-link" activeClassName="is-active" to={`${url}/reservation`}><FontAwesomeIcon className='icon' icon={faCalendarCheck} />Reservations</NavLink>
      <NavLink className="menu-link"  activeClassName="is-active" to={`${url}/payment`}><FontAwesomeIcon className='icon' icon={faMoneyCheckAlt} />Payments</NavLink>
    </div>

        <Switch>
        <Route path={`${path}`} exact component = {Customer} />
          <Route path={`${path}/customer`} component = {Customer} />
          <Route path={`${path}/reservation`} component = {Reservation} />
          <Route path={`${path}/payment`} component = {Payment} />
        </Switch>




    
    </div>
  );
}

export default CustomerPage;
