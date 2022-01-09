import React from 'react';
import "./styles/Home.css";
import {Pchart} from './charts/staffpie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faFileInvoice, faBuilding, faDoorOpen, faMoneyBillWave, faUserCheck, faPoll, faUsersSlash, faUserTimes } from '@fortawesome/free-solid-svg-icons';


const Home = () => {

  return (
    
    <div className="home-page">
      <div className="content">
        
          <div className='widgets1'>

            <div className='pie'>
              <h3> Lak Derana Staffs </h3>
              <Pchart />
            </div>

            <div className='dash-card-col'>
              <div className='dash-card-row'>

                <div className='quick-check-in-card'>
                  <h2>Make a Quick <br />Check-In</h2>
                  <button> Check-In</button>
                </div>

              </div>

                <div className='dash-card-row'>

                    {/* totla rooms */}
                      <div className='cards'>
                        <div className='titl'>
                            Total Rooms <br /> <h2>67</h2> 
                        </div>
                      <div className='icon'><FontAwesomeIcon icon={faBuilding} /></div>
                      </div>

                    {/* Rooms Available */}
                      <div className='cards'>
                        <div className='titl'>
                            Rooms Available <br /> <h2>67</h2> 
                          </div>
                        <div className='icon'><FontAwesomeIcon icon={faDoorOpen} /></div>

                  </div>

                </div>

              </div>
                          
                  <div className='dash-cards'>

                      <div className='card-cus'>
                      {/* total booking */}

                        <div className='icon'><FontAwesomeIcon icon={faPoll} /></div>

                          <div className='titl'> 
                          <h1>863</h1> 
                          Total Booking
                          </div>

                      {/* total Revenue */}

                          <div className='hori-rule'></div>

                          <div className='icon'><FontAwesomeIcon icon={faMoneyBillWave} /></div>

                          <div className='titl'> 
                          <h1>$38,211</h1> 
                          Total Revenue
                          </div>

                      </div>

                  </div>

              </div>
          

              <div className='widgets2'> 
              
                <div className='cus-card-2'>
                  <h4>Customer Statistics</h4>
                  <div className='items'>
                    <div className='item'>
                      <span className='st-icon'><FontAwesomeIcon icon={faUsers} /></span>
                      <div className=' c2titl'>Total Customers<br /> <p>1248</p></div>
                    </div>
                    <div className='item'>
                    <span className='st-icon'><FontAwesomeIcon icon={faUserCheck} /></span>
                      <div className='c2titl'>Active Customers<br /> <p>1248</p></div>
                    </div>
                    <div className='item'>
                    <span className='st-icon'><FontAwesomeIcon icon={faUsersSlash} /></span>
                      <div className='c2titl'>Inactive Customers<br /> <p>1248</p></div>
                    </div>
                  </div>
                </div>

                <div className='cus-card-3'>
                  <div className='icon'><FontAwesomeIcon icon={faFileInvoice} /></div>
                    <div className='titl'> 
                      <h3>863</h3> 
                      Unpaid Invoices
                    </div>
               </div>
               <div className='cus-card-3'>
                  <div className='icon'><FontAwesomeIcon icon={faUserTimes} /></div>
                    <div className='titl'> 
                      <h3>863</h3> 
                      staffs in Leave
                    </div>
               </div>

              </div>


        </div>

    </div>
  );
}

export default Home;