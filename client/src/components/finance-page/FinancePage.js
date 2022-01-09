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

const FinancePage = () => {
  let { path, url } = useRouteMatch();

  return (

    <div className='finance-page'>

    <div className='sub-options'>
      <NavLink className="menu-link" activeClassName="is-active" to={`${url}/finance`}><FontAwesomeIcon className='icon' icon={faHandHoldingUsd} />Finance</NavLink>
    </div>

        <Switch>
          <Route path={`${path}`} exact component = {Finance} />
          <Route path={`${path}/finance`} component = {Finance} />
        </Switch>
    
    </div>

  );
}

export default FinancePage;
