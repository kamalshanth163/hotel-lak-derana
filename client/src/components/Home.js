import React, { useEffect, useState } from 'react';
import "./styles/Home.css";
import {Pchart} from './charts/staffpie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faFileInvoice, faBuilding, faDoorOpen, faMoneyBillWave, faUserCheck, faPoll, faUsersSlash, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import API_Employee from '../APIs/API_Employee';
import API_Customer from '../APIs/API_Customer';
import API_Reservation from '../APIs/API_Reservation';
import API_Hotel from '../APIs/API_Hotel';
import API_Room from '../APIs/API_Room';
import API_Finance from '../APIs/API_Finance';


const Home = () => {

  // var initialStats = {
  //   totalHotels: 0,
  //   totalRooms: 0,
  //   totalCustomers: 0,
  //   totalEmployees: 0,
  //   totalReservations: 0,
  //   totalIncome: 0,
  //   totalExpense: 0,
  //   employee_count: {
  //       admin: 0,
  //       hr: 0,
  //       reservationManager: 0,
  //       barManager: 0,
  //       manaager: 0
  //   }
  // }

  // const [stats, setStats] = useState(initialStats);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalReservations, setTotalReservations] = useState(0);
  const [totalHotels, setTotalHotels] = useState(0);
  const [totalRooms, setTotalRooms] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [employeeCounts, setEmployeeCounts] = useState({});

  useEffect(() => {
    getStats();
  }, [])

  const getStats = () => {
    new API_Employee().getAllEmployees().then(data => {
      setTotalEmployees(data.length);

      const admins = data.filter((d) => d.role === "Admin");
      const managers = data.filter((d) => d.role === "Manager");
      const reservation_managers = data.filter((d) => d.role === "Reservation Manager");
      const bar_managers = data.filter((d) => d.role === "Bar Manager");
      const human_resource_managers = data.filter((d) => d.role === "Human Resource Manager");

      console.log(admins.length)
      console.log(reservation_managers.length)
      console.log(reservation_managers.length)
      console.log(reservation_managers.length)
      console.log(reservation_managers.length)

      var obj = {
        e1: admins.length,
        e2: managers.length,
        e3: reservation_managers.length,
        e4: bar_managers.length,
        e5: human_resource_managers.length,
      }


      console.log(obj)
      setEmployeeCounts(obj)
      // reservation_managers,
      // bar_managers,
      // human_resource_managers

      
    });

    new API_Customer().getAllCustomers().then(data => {
      setTotalCustomers(data.length);  
    });
    new API_Reservation().getAllReservations().then(data => {
      setTotalReservations(data.length);  
    });
    new API_Hotel().getAllHotels().then(data => {
      setTotalHotels(data.length);  
    });
    new API_Room().getAllRooms().then(data => {
      setTotalRooms(data.length);  
    });
    new API_Finance().getAllFinances().then(data => {
      const income = data.reduce((sum, d) => sum + d.income, 0);
      const expense = data.reduce((sum, d) => sum + d.expense, 0);
      setTotalIncome(income);  
      setTotalExpense(expense);  
    });

    
  }
  console.log(employeeCounts)
  return (
    
    <div className="home-page">
      <div className="content">
        
          <div className='widgets1'>

            <div className='pie'>
              <h3> Lak Derana Staffs </h3>
              <Pchart counts={employeeCounts} />
            </div>

            <div className='dash-card-col'>
              <div className='dash-card-row'>

                <div className='quick-check-in-card'>
                  <h2>Welcome to <br></br>Lak Derana Hotels</h2>
                  {/* <h2>Make a Quick <br />Check-In</h2> */}
                  {/* <button> Check-In</button> */}
                </div>

              </div>

                <div className='dash-card-row'>

                    {/* totla rooms */}
                      <div className='cards'>
                        <div className='titl'>
                            Total Hotels <br /> <h2>{totalHotels}</h2> 
                        </div>
                      <div className='icon'><FontAwesomeIcon icon={faBuilding} /></div>
                      </div>

                    {/* Rooms Available */}
                      <div className='cards'>
                        <div className='titl'>
                            Total Rooms <br /> <h2>{totalRooms}</h2> 
                          </div>
                        <div className='icon'><FontAwesomeIcon icon={faDoorOpen} /></div>

                  </div>

                </div>

              </div>
                          
                  <div className='dash-cards'>

                      <div className='card-cus'>
                      {/* total booking */}

                      {/* <div className='icon'><FontAwesomeIcon icon={faUserTimes} /></div> */}
                      <div className='icon'><FontAwesomeIcon icon={faMoneyBillWave} /></div>
                          <div className='titl'> 
                          <h1>LKR {totalIncome}</h1>  
                          Total Income
                          </div>

                      {/* total Revenue */}

                          <div className='hori-rule'></div>

                          <div className='icon'><FontAwesomeIcon icon={faMoneyBillWave} /></div>

                          <div className='titl'> 
                          <h1>LKR {totalExpense}</h1> 
                          Total Expense
                          </div>

                      </div>

                  </div>

              </div>
          

              <div className='widgets2'> 
              
                <div className='cus-card-2'>
                  <h4>Statistics</h4>
                  <div className='items'>
                    <div className='item'>
                      <span className='st-icon'><FontAwesomeIcon icon={faUsers} /></span>
                      <div className=' c2titl'>Total Customers<br /> <p>{totalCustomers}</p></div>
                    </div>

                    <div className='item'>
                    <span className='st-icon'><FontAwesomeIcon icon={faFileInvoice} /></span>
                      <div className='c2titl'>Total Bookings<br /> <p>{totalReservations}</p></div>
                    </div>
                    <div className='item'>

                    <span className='st-icon'><FontAwesomeIcon icon={faPoll} /></span>
                      <div className='c2titl'>Total Employees<br /> <p>{totalEmployees}</p></div>
                    </div>
                  </div>
                </div>

                {/* <div className='cus-card-3'>
                  <div className='icon'><FontAwesomeIcon icon={faFileInvoice} /></div>
                    <div className='titl'> 
                      <h3>863</h3> 
                      Total Bookings
                    </div>
               </div>
               <div className='cus-card-3'>
                  <div className='icon'><FontAwesomeIcon icon={faPoll} /></div>
                    <div className='titl'> 
                      <h3>863</h3> 
                      Total Employees
                    </div>
               </div> */}

              </div>


        </div>

    </div>
  );
}

export default Home;