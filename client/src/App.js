import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { AppContextProvider } from './AppContext';
import NavBar from './components/NavBar';
import Home from './components/Home';
import AdminPage from './components/admin-page/AdminPage';
import CustomerPage from './components/customer-page/CustomerPage';
import StaffPage from './components/staff-page/StaffPage';
import FinancePage from './components/finance-page/FinancePage';
import ReportPage from './components/report-page/ReportPage';
import InventoryPage from './components/inventory-page/InventoryPage';

function App() {
  return (
    <AppContextProvider>
      <Router>
        <NavBar />
        <Switch>
            <Route path="/" exact component = {Home} />
            <Route path="/admin-page" component = {AdminPage} />
            <Route path="/customer-page" component = {CustomerPage} />
            <Route path="/staff-page" component = {StaffPage} />
            <Route path="/finance-page" component = {FinancePage} />
            <Route path="/report-page" component = {ReportPage} />
            <Route path="/inventory-page" component = {InventoryPage} />
        </Switch>
      </Router>
    </AppContextProvider>
  );
}

export default App;
