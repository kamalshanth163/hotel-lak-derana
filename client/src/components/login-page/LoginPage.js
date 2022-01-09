import React, { useState } from 'react';
import '../styles/LoginPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import API_Employee from '../../APIs/API_Employee';
import { createBrowserHistory } from 'history';

function LoginPage() {
    const history = createBrowserHistory()
    var initialUser = {
        email: "",
        password: ""
      }
      const [user, setUser] = useState(initialUser);

    const handleLogin = (e) => {
        e.preventDefault();
        new API_Employee().loginUser(user).then(data => {
            localStorage.setItem("user", JSON.stringify({
                id: data.id,
                name: data.name,
                email: data.email,
                department: data.department,
                role: data.role
            }))
            history.go('/');
          });        
      }

      const handleChange = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setUser({...user, [name]: value});
      }

  return (  
    
    <div className='login-page'>
<section>
        <div className="img-bg">
          <img src={require('../../assets/images/lakderena2.jpg')} alt="Lak-Derena-Illustration" />
        </div>
        <div className="content">
          <div className="form-div">
          <div className='div-logo'><span className='logo'></span></div>

            <div className='heading'>
            <h2>Welcome to Lak Derena <br /> Hotel Management System</h2>
            </div>
            <div className='alert'> <span>if you face any login issue, please contact your <a>supervisor.</a></span></div>
            <form action>
              <div className="input-form">
                <span>Email</span>
                <input placeholder='name@lakderana.com' type="text" id="email" name="email" value={user.email} required onChange={(e)=>handleChange(e)} />
              </div>
              <div className="input-form">
                <span>Password</span>
                <input placeholder='********' type="password"  id="password" name="password" value={user.password} required onChange={(e)=>handleChange(e)} />
              </div>
              <div  className="input-form">
              <button type="submit" onClick={(e) => handleLogin(e)}> LOG IN </button>
              </div>
            </form>
            <div className='copyright-box'> <p>©2022 LakDerena. All rights reserved.</p></div>

          </div>
        </div>
      </section>

    </div>
  );
}

export default LoginPage;



