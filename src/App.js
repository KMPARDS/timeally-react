import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'; // this is for accessing the store\

import Navbar from './containers/Navbar/Navbar';
import Dashboard from './containers/Dashboard/Dashboard';
import Transactions from './containers/Transactions/Transactions';
import Wallet from './containers/Wallet/Wallet';

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar style={{margin: '0 0 10px'}} />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/transactions" exact component={Transactions} />
          <Route path="/wallet" exact component={Wallet} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default connect(state => {return{store: state}})(App);
