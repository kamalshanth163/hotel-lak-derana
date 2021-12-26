import React, { useContext, useEffect, useState } from 'react';
import '../App.css';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { AppContext } from '../AppContext';

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
                    <NavLink className="navlink" activeClassName="is-active" to="/admin">Admin</NavLink>
                  </td>
                  <td>
                    <NavLink className="navlink" activeClassName="is-active" to="/customer">Customer</NavLink>
                  </td>
                  <td>
                    <NavLink className="navlink" activeClassName="is-active" to="/staff">Staff</NavLink>
                  </td>
                  <td>
                    <NavLink className="navlink" activeClassName="is-active" to="/bar">Bar</NavLink>
                  </td>
                </tr>
              </table>
            </div>
          </div>
    </div>
  );
}

export default NavBar;
