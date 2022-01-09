import React from 'react';
import '../styles/InventoryPage.css'
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Inventory from './tabs/Inventory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { faDollyFlatbed ,faMoneyCheckAlt} from '@fortawesome/free-solid-svg-icons';

const InventoryPage = () => {
  let { path, url } = useRouteMatch();

  return (

    
  <div className='customer-page'>

  <div className='sub-options'>
    <NavLink className="menu-link"  activeClassName="is-active" to={`${url}/inventory`}><FontAwesomeIcon className='icon' icon={faDollyFlatbed} />Inventory</NavLink>
  </div>

      <Switch>
          <Route path={`${path}`} exact component = {Inventory} />
          <Route path={`${path}/inventory`} component = {Inventory} />
      </Switch>


    </div>

  );
}

export default InventoryPage;
