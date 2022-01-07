import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Header from './components/header';
import AdminPage from './components/admin-page/AdminPage';
import CustomerPage from './components/customer-page/CustomerPage';
import StaffPage from './components/staff-page/StaffPage';
import FinancePage from './components/finance-page/FinancePage';
import InventoryPage from './components/inventory-page/InventoryPage';
import ReportPage from './components/report-page/ReportPage';

import NavBar from './components/NavBar';
import { AppContextProvider } from './AppContext';
import Signin from './components/sign_in';


function App() {
  return (

    // <Dtable />


    <div className='col-div'>
    <AppContextProvider>
      <Router>
      <NavBar />
      

      <div className='row-div'>
      <Header />
      <Switch>
            <Route path="/" exact component = {Home} />
            <Route path="/admin-page" component = {AdminPage} />
            <Route path="/inventory-page" component = {InventoryPage} />
            <Route path="/customer-page" component = {CustomerPage} />
            <Route path="/staff-page" component = {StaffPage} />
            <Route path="/finance-page" component = {FinancePage} />
            <Route path="/report-page" component = {ReportPage} />
        </Switch>
      </div>




      </Router>
    </AppContextProvider>
    </div>

  );
}

export default App;
