import React, { useState , useEffect } from 'react';
import '../components/styles/header.css';
import {Dropdown} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';



export const Header = () => {

  var [date,setDate] = useState(new Date());
  
  useEffect(() => {
      var timer = setInterval(()=>setDate(new Date()), 1000 )
      return function cleanup() {
          clearInterval(timer)
      }
  
  });

  return(
    <div className='flex-wrap'>
    <h2 className="main-text">Hi, Welcome back to Lak Derena !</h2>
    <div className='flex-items'>
    <div className='time'> <FontAwesomeIcon className='icon' icon={faClock} />  {date.toLocaleTimeString()}</div>
    <div className='date'> <FontAwesomeIcon className='icon' icon={faCalendarAlt} />  {date.toLocaleDateString()}</div>
      <Dropdown>
          <Dropdown.Toggle id="dropdown-basic">
            Account
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Log-out</Dropdown.Item>
          </Dropdown.Menu>
      </Dropdown>
    <div className='branch-label'> Kandy Branch </div>
    </div>
 </div>
  )
}

export default Header;
