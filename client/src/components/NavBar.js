import React from 'react';
import '../components/styles/navbar.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faIdCard, faTasks, faUsers, faFileInvoiceDollar, faBoxes, faFileContract } from '@fortawesome/free-solid-svg-icons';
import {Dropdown} from "react-bootstrap";


const NavBar = () => {

  return (
        <div class="topnav">      
            <div className="nav-logo">
                
            <NavLink className="navlink" activeClassName="is-active" to="/" exact> <div className='logo'></div>
                </NavLink>
            </div>           
            <div className="navlinks">

              <table>
                <tr>
                  <td>
                    <NavLink className="navlink link" activeClassName="is-active" to="/" exact>
                    <FontAwesomeIcon className='navicon' icon={faHome} />
                    Dashboard</NavLink>
                  </td>
                </tr>
                <tr>
                  <td>
                    <NavLink className="navlink link" activeClassName="is-active" to="/customer-page" >
                    <span className='navicon'> <FontAwesomeIcon icon={faUsers} /> </span>
                    Customer</NavLink>
                  </td>
                </tr>                

                <tr>
                  <td>
                      <NavLink className="navlink link" activeClassName="is-active" to="/staff-page">
                      <span className='navicon'> <FontAwesomeIcon icon={faIdCard} /> </span>
                      Staff</NavLink>
                  </td>
                </tr>
                <tr>
                  <td>
                      <NavLink className="navlink link" activeClassName="is-active" to="/finance-page/finance">
                      <span className='navicon'> <FontAwesomeIcon icon={faFileInvoiceDollar} /> </span>
                      Finance</NavLink>
                  </td>
                </tr>
                <tr>
                  <td>
                      <NavLink className="navlink link" activeClassName="is-active" to="/inventory-page/inventory">   
                      <span className='navicon'> <FontAwesomeIcon icon={faBoxes} /> </span>
                      Inventory</NavLink>
                  </td>
                </tr> 
                <tr>
                  <td>
                      <NavLink className="navlink link" activeClassName="is-active"  to="/admin-page">   
                      <span className='navicon'> <FontAwesomeIcon icon={faTasks} /> </span>
                      Admin</NavLink>
                  </td>
                </tr>   
                <tr>
                  <td>
                      <NavLink className="navlink link" activeClassName="is-active"  to="/report-page/report">   
                      <span className='navicon'> <FontAwesomeIcon icon={faFileContract} /> </span>
                      Reports</NavLink>
                  </td>
                </tr>                

              </table>
            </div>

          </div>
  );
}

export default NavBar;
