import React from 'react';
import "../App.css";
import { createBrowserHistory } from 'history';

const MessageBox = ({role}) => {

  const history = createBrowserHistory();
  
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

return (
    <div className='message-area'>
      <h2 className='message-text'>Please login as {role} to view this page</h2>
      <br></br>
      <button className='message-btn' onClick={() => handleLogout()}>Login as {role}</button>
    </div>
  );
}

export default MessageBox;