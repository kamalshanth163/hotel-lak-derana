import React, { useState } from 'react';
import '../styles/FinancePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { faHandHoldingUsd} from '@fortawesome/free-solid-svg-icons';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Finance from './tabs/Finance';
import MessageBox from '../MessageBox';

const FinancePage = () => {
  let { path, url } = useRouteMatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (

    <div className='finance-page'>

{user.role === "Manager" || user.role === "Admin"  ?
    <div>
    <div className='sub-options'>
      <NavLink className="menu-link" activeClassName="is-active" to={`${url}/finance`}><FontAwesomeIcon className='icon' icon={faHandHoldingUsd} />Finance</NavLink>
    </div>

        <Switch>
          <Route path={`${path}`} exact component = {Finance} />
          <Route path={`${path}/finance`} component = {Finance} />
        </Switch>
    </div>
    : <div>
      <MessageBox role={"Manager or Admin"} />
    </div>
    }      
    </div>

  );
}

export default FinancePage;
