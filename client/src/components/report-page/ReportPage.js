import React, { useState } from 'react';
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
import MessageBox from '../MessageBox';

const ReportPage = () => {
  let { path, url } = useRouteMatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (

    <div className='report-page'>

{user.role === "Manager" || user.role === "Admin"  ?
    <div>
    <div className='sub-options'>
      <NavLink className="menu-link" activeClassName="is-active" to={`${url}/report`}><FontAwesomeIcon className='icon' icon={faFileContract} />Reports</NavLink>
    </div>
        <Switch>
          <Route path={`${path}`} exact component = {Report} />
          <Route path={`${path}/report`} component = {Report} />
        </Switch>
    </div>
    : <div>
    <MessageBox role={"Manager or Admin"}/>
    </div>
    }


    
    </div>

  );
}

export default ReportPage;
