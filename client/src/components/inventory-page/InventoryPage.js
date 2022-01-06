import React from 'react';
import '../styles/InventoryPage.css'
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Inventory from './tabs/Inventory';

const InventoryPage = () => {
  let { path, url } = useRouteMatch();

  return (

  <div className='inventory-page'>
    <div>
      <div>

        <h1>Inventory page</h1>
        <table className='inventory-menu'>
          <tr>
            <td>
              <Link className="menu-link" to={`${url}/inventory`}>Inventories</Link>
            </td>
          </tr>
        </table>

        <Switch>
          <Route path={`${path}`} exact component = {Inventory} />
          <Route path={`${path}/inventory`} component = {Inventory} />
        </Switch>

      </div>
    </div>
    
    </div>
  );
}

export default InventoryPage;
