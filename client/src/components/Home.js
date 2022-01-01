import React from 'react';
import { useHistory } from 'react-router-dom';
import "./styles/Home.css";

const Home = () => {
  const history = useHistory();

  return (
    <div className="home-page">
      <div className="banner">
        <div>
          <h1 className="text-2">Welcome to <br /> Lak Derana Hotels</h1>
          <button className="btn btn-1" onClick={() => history.push('./admin-page')}>
            System Management & Reporting
          </button><br />
          <button className="btn btn-2" onClick={() => history.push('./customer-page')}>
            Customer Inquiry, Reservation & Payment Handling
          </button><br />
          <button className="btn btn-3" onClick={() => history.push('./staff-page')}>
            Attendance Management & Payroll
          </button><br />
          <button className="btn btn-4" onClick={() => history.push('./bar-page')}>
            Bar Management
          </button><br />
        </div>
      </div>
    </div>
  );
}

export default Home;
