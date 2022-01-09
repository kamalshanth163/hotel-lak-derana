import React from 'react';
import '../styles/ReportPage.css'
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Report from './tabs/Report';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileContract} from '@fortawesome/free-solid-svg-icons';

const ReportPage = () => {
  let { path, url } = useRouteMatch();

  return (

    <div className='report-page'>

    <div className='sub-options'>
      <NavLink className="menu-link" activeClassName="is-active" to={`${url}/report`}><FontAwesomeIcon className='icon' icon={faFileContract} />Reports</NavLink>
    </div>
        <Switch>
          <Route path={`${path}`} exact component = {Report} />
          <Route path={`${path}/report`} component = {Report} />
        </Switch>
    </div>

  );
}

export default ReportPage;
