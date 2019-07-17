import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'; // this is for accessing the store\

import Navbar from './containers/Navbar/Navbar';
import CreateWallet from './containers/CreateWallet/CreateWallet';
import LoadWallet from './containers/LoadWallet/LoadWallet';
import Dashboard from './containers/Dashboard/Dashboard';
import Transactions from './containers/Transactions/Transactions';
import StakingTransactions from './containers/Transactions/Stakings';
import WithdrawlTransactions from './containers/Transactions/Withdrawls';
import Wallet from './containers/Wallet/Wallet';
import Staking from './containers/Stakings/Stakings';

import logo from './logo.svg';
import './App.css';

import provider from './ethereum/provider';
import { esContract } from './env.js';
const ethers = require('ethers');

window.redirectHereAfterLoadWallet = '/dashboard';

function App(props) {

  // load es instance
  if(Object.entries(props.store.esInstance).length === 0) {
    console.log(provider, new ethers.providers.InfuraProvider('kovan'));
    props.dispatch({ type: 'LOAD-ES-INSTANCE', payload: new ethers.Contract(esContract.address, esContract.abi, provider) });
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div style={{margin:'15px'}}>
          <Switch>
            <Route path="/" exact render={() => <p>Home page</p>} />
            <Route path="/create-wallet" exact component={CreateWallet} />
            <Route path="/load-wallet" component={LoadWallet} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/wallet" exact component={Wallet} />
            <Route path="/stakings" component={Staking} />
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
      </div>
    </BrowserRouter>
  );
}

export default connect(state => {return{store: state}})(App);
