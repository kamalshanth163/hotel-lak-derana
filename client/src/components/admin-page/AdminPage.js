import React, { useState } from 'react';
import '../styles/AdminPage.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Employee from './tabs/Employee';
import Hotel from './tabs/Hotel';
import Room from './tabs/Room';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends,faHotel ,faDoorOpen} from '@fortawesome/free-solid-svg-icons';
import MessageBox from '../MessageBox';

const AdminPage = () => {
  let { path, url } = useRouteMatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (

    <div className='admin-page'>

    {user.role === "Admin" ?
    <div>
    <div className='sub-options'>
      <NavLink className="menu-link" activeClassName="is-active" to={`${url}/employee`}><FontAwesomeIcon className='icon' icon={faUserFriends} />Employees</NavLink>
      <NavLink className="menu-link" activeClassName="is-active" to={`${url}/hotel`}><FontAwesomeIcon className='icon' icon={faHotel} />Hotels</NavLink>
      <NavLink className="menu-link" activeClassName="is-active" to={`${url}/room`}><FontAwesomeIcon className='icon' icon={faDoorOpen} />Rooms</NavLink>
    </div>

        <Switch>
           <Route path={`${path}`} exact component = {Employee} />
           <Route path={`${path}/employee`} component = {Employee} />
           <Route path={`${path}/hotel`} component = {Hotel} />
           <Route path={`${path}/room`} component = {Room} />
        </Switch>
    </div>
    : <div>
    <MessageBox role={"Admin"}/>
    </div>
    }
    </div>
  
  
  
  
  
  
  
  
  );
}

export default AdminPage;
