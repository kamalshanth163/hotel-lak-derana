import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Admin from './components/admin-page/Admin';
import Member from './components/admin-page/tabs/Member';
import Customer from './components/Customer';
import Staff from './components/Staff';
import Bar from './components/Bar';
import NavBar from './components/NavBar';
import { AppContextProvider } from './AppContext';

function App() {
  return (
    <AppContextProvider>
      <Router>
        <NavBar />
        <Switch>
            <Route path="/" exact component = {Home} />
            <Route path="/admin" component = {Admin}>
              {/* <Route path="/members" exact component = {Member} /> */}
            </Route>
            {/* <Route path="/admin/member" exact component = {Member} /> */}
            <Route path="/customer" exact component = {Customer} />
            <Route path="/staff" exact component = {Staff} />
            <Route path="/bar" exact component = {Bar} />
        </Switch>
      </Router>
    </AppContextProvider>
  );
}

export default App;
