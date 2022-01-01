import React, { useState } from 'react';
import '../styles/FinancePage.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Finance from './tabs/Finance';

const FinancePage = () => {
  let { path, url } = useRouteMatch();

  return (

  <div className='finance-page'>
    <div>
      <div>

        <h1>Finance page</h1>
        <table className='finance-menu'>
          <tr>
            <td>
              <Link className="menu-link" to={`${url}/finance`}>Finances</Link>
            </td>
          </tr>
        </table>

        <Switch>
          <Route path={`${path}`} exact component = {Finance} />
          <Route path={`${path}/finance`} component = {Finance} />
        </Switch>

      </div>
    </div>
    
    </div>
  );
}

export default FinancePage;
