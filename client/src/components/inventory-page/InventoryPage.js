import React, { useState } from 'react';
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
import MessageBox from '../MessageBox';

const InventoryPage = () => {
  let { path, url } = useRouteMatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (

    
  <div className='customer-page'>

{user.role === "Manager" || user.role === "Admin" ?
    <div>
    <div className='sub-options'>
    <NavLink className="menu-link"  activeClassName="is-active" to={`${url}/inventory`}><FontAwesomeIcon className='icon' icon={faDollyFlatbed} />Inventory</NavLink>
  </div>

      <Switch>
          <Route path={`${path}`} exact component = {Inventory} />
          <Route path={`${path}/inventory`} component = {Inventory} />
      </Switch>
    </div>
    : <div>
      <MessageBox role={"Manager or Admin"} />
    </div>
    }   
    </div>

  );
}

export default InventoryPage;
