import React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';

const NavBar = () => {

  return (
    <div>
        <div class="topnav">      
            <div className="nav-topbar">
              <table>
                <tr>
                  <td>
                    <NavLink className="logo" to="/">
                      <h1 className="main-text">Lak Derana</h1>
                    </NavLink>
                  </td>
                  <td className="sign-section">
                    <span className="user-sign">
                      <span className="signin-btn">Login</span>
                    </span>
                  </td>
                </tr>
              </table>
            </div>           
            <div className="navlinks">
              <table>
                <tr>
                  <td>
                    <NavLink className="navlink" activeClassName="is-active" to="/" exact>Home</NavLink>
                  </td>
                  <td>
                    <NavLink className="navlink" activeClassName="is-active" to="/admin-page">Admin</NavLink>
                  </td>
                  <td>
                    <NavLink className="navlink" activeClassName="is-active" to="/customer-page">Customer</NavLink>
                  </td>
                  <td>
                    <NavLink className="navlink" activeClassName="is-active" to="/staff-page">Staff</NavLink>
                  </td>
                  <td>
                    <NavLink className="navlink" activeClassName="is-active" to="/finance-page">Finance</NavLink>
                  </td>
                </tr>
              </table>
            </div>
          </div>
    </div>
  );
}

export default NavBar;
