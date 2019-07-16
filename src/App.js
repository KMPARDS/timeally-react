import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'; // this is for accessing the store\

import Navbar from './containers/Navbar/Navbar';
import Dashboard from './containers/Dashboard/Dashboard';
import Transactions from './containers/Transactions/Transactions';
import StakingTransactions from './containers/Transactions/Stakings.js';
import WithdrawlTransactions from './containers/Transactions/Withdrawls.js';
import Wallet from './containers/Wallet/Wallet';

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/wallet" exact component={Wallet} />
          <Route path="/stakings" exact />
          <Route path="/stakings/:id" exact />
          <Route path="/loans" exact />
          <Route path="/loans/:id" exact />
          <Route path="/transactions" exact component={Transactions} />
          <Route path="/transactions/stakings" exact component={StakingTransactions} />
          <Route path="/trasnactions/withdrawls" exact render={
            () => <div>List of withdrawl transactions</div>
          } />
          <Route path="/insurance" exact render={
            () => <div>Coming soon</div>
          } />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default connect(state => {return{store: state}})(App);
