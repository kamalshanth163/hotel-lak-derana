import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import AdminPage from './components/admin-page/AdminPage';
import CustomerPage from './components/customer-page/CustomerPage';
import StaffPage from './components/staff-page/StaffPage';
import FinancePage from './components/finance-page/FinancePage';
import InventoryPage from './components/inventory-page/InventoryPage';
import ReportPage from './components/report-page/ReportPage';
import NavBar from './components/NavBar';
import { AppContextProvider } from './AppContext';
import LoginPage from './components/login-page/LoginPage';
import { createBrowserHistory } from 'history';

//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';

function App() {
  
  const history = createBrowserHistory()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    if(user === null){
      localStorage.setItem("user", JSON.stringify({
        id: 0,
        name: "",
        email: "",
        department: "",
        role: ""
      }))
    }
  }, user)

  return (

    <div className='col-div'>

{user === null || user.id === 0 
    ?
      <LoginPage />
    : 
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
         }
    </div>

  );
}

export default App;
