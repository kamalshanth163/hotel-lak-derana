import React from 'react';
import '../styles/CustomerPage.css'
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Customer from './tabs/Customer';
import Reservation from './tabs/Reservation';
import Payment from './tabs/Payment';

const CustomerPage = () => {
  let { path, url } = useRouteMatch();

  return (

  <div className='customer-page'>
    <div>
      <div>

        <h1>Customer page</h1>
        <table className='customer-menu'>
          <tr>
            <td>
              <Link className="menu-link" to={`${url}/customer`}>Customers</Link>
            </td>
            <td>
              <Link className="menu-link" to={`${url}/reservation`}>Reservations</Link>
            </td>
            <td>
              <Link className="menu-link" to={`${url}/payment`}>Payments</Link>
            </td>
          </tr>
        </table>

        <Switch>
          <Route path={`${path}`} exact component = {Customer} />
          <Route path={`${path}/customer`} component = {Customer} />
          <Route path={`${path}/reservation`} component = {Reservation} />
          <Route path={`${path}/payment`} component = {Payment} />
        </Switch>

      </div>
    </div>
    
    </div>
  );
}

export default CustomerPage;
