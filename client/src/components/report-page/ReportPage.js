import React from 'react';
import '../styles/ReportPage.css'
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Report from './tabs/Report';

const ReportPage = () => {
  let { path, url } = useRouteMatch();

  return (

  <div className='report-page'>
    <div>
      <div>

        <h1>Report page</h1>
        <table className='report-menu'>
          <tr>
            <td>
              <Link className="menu-link" to={`${url}/report`}>Reports</Link>
            </td>
          </tr>
        </table>

        <Switch>
          <Route path={`${path}`} exact component = {Report} />
          <Route path={`${path}/report`} component = {Report} />
        </Switch>

      </div>
    </div>
    
    </div>
  );
}

export default ReportPage;
