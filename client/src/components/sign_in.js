import React from 'react';
import './styles/sign_in.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function Signin() {
  return (
    
    <div>

<section>
        <div className="img-bg">
          <img src={require('../assets/images/lakderena2.jpg')} alt="Lak-Derena-Illustration" />
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
                <input placeholder='name@lakderena.com' type="text" name />
              </div>
              <div className="input-form">
                <span>Password</span>
                <input placeholder='Password' type="password" name />
              </div>
              <div  className="input-form">
              <button type="submit"> LOG IN </button>
              </div>
            </form>
            <div className='copyright-box'> <p>©2022 LakDerena. All rights reserved.</p></div>

          </div>
        </div>
      </section>

    </div>
  );
}

export default Signin;



