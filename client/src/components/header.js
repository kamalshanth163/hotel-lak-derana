import React, { useState , useEffect } from 'react';
import '../components/styles/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { createBrowserHistory } from 'history';

export const Header = () => {
  
  const history = createBrowserHistory()
  var [date,setDate] = useState(new Date());
  
  useEffect(() => {
      var timer = setInterval(()=>setDate(new Date()), 1000 )
      return function cleanup() {
          clearInterval(timer)
      }
  });

  const handleLogout = () => {
    localStorage.setItem("user", JSON.stringify({
      id: 0,
      name: "",
      email: "",
      department: "",
      role: ""
    }))
    history.go('/login-page')
  }

  return(
    <div className='flex-wrap'>
    <h2 className="main-text">Hi, Welcome to Lak Derana</h2>
    <div className='flex-items'>
    <div className='time'> <FontAwesomeIcon className='icon' icon={faClock} />  {date.toLocaleTimeString()}</div>
    <div className='date'> <FontAwesomeIcon className='icon' icon={faCalendarAlt} />  {date.toLocaleDateString()}</div>
    <button className='login-btn' onClick={() => handleLogout()}>Logout</button>
      {/* <Dropdown>
          <Dropdown.Toggle id="dropdown-basic">
            Login
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Log-out</Dropdown.Item>
          </Dropdown.Menu>
      </Dropdown> */}
    {/* <div className='branch-label'> Kandy Branch </div> */}
    </div>
 </div>
  )
}

export default Header;
