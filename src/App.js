import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'; // this is for accessing the store\

import Navbar from './containers/Navbar/Navbar';
import Home from './containers/Home/Home';
import CreateWallet from './containers/CreateWallet/CreateWallet';
import LoadWallet from './containers/LoadWallet/LoadWallet';
import Dashboard from './containers/Dashboard/Dashboard';
import Transactions from './containers/Transactions/Transactions';
import StakingTransactions from './containers/Transactions/Stakings';
import WithdrawlTransactions from './containers/Transactions/Withdrawls';
import Wallet from './containers/Wallet/Wallet';
import Loans from './containers/Loans/Loans';
import Staking from './containers/Stakings/Stakings';
import Mou from './containers/Mou/Mou';
import Rewards from './containers/Rewards/Rewards';

//import { Button } from 'react-bootstrap';

//import logo from './logo.svg';
import './App.css';

import provider from './ethereum/provider';
import { esContract, nrtManager, timeally } from './env.js';
const ethers = require('ethers');

window.redirectHereAfterLoadWallet = '/dashboard';

function App(props) {

  //for dev purpose 24C4FE6063E62710EAD956611B71825B778B041B18ED53118CE5DA5F02E494BA
  setTimeout(() => {
    if(Object.entries(props.store.walletInstance).length === 0) {
      //console.log(provider, new ethers.providers.InfuraProvider('kovan'));
      props.dispatch({ type: 'LOAD-WALLET-INSTANCE', payload: new ethers.Wallet('0x24C4FE6063E62710EAD956611B71825B778B041B18ED53118CE5DA5F02E494BA', provider) });
    }
  },50);

  // load es instance
  if(Object.entries(props.store.esInstance).length === 0) {
    //console.log(provider, new ethers.providers.InfuraProvider('kovan'));
    props.dispatch({ type: 'LOAD-ES-INSTANCE', payload: new ethers.Contract(esContract.address, esContract.abi, provider) });
  }

  // load es instance
  if(Object.entries(props.store.nrtInstance).length === 0) {
    //console.log(provider, new ethers.providers.InfuraProvider('kovan'));
    props.dispatch({ type: 'LOAD-NRT-INSTANCE', payload: new ethers.Contract(nrtManager.address, nrtManager.abi, provider) });
  }

  // load timeally
  if(Object.entries(props.store.timeallyInstance).length === 0) {
    //console.log(provider, new ethers.providers.InfuraProvider('kovan'));
    props.dispatch({ type: 'LOAD-TIMEALLY-INSTANCE', payload: new ethers.Contract(timeally.address, timeally.abi, provider) });
  }

  return (

    <BrowserRouter>
      <div className="App">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <Navbar />
        <div style={{margin:'0px'}}>
          <Switch>
            {/* <Route path="/" exact render={() => <p>Home page</p>} /> */}
            <Route path="/" exact component={Home} />
            <Route path="/create-wallet" exact component={CreateWallet} />
            <Route path="/load-wallet" component={LoadWallet} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/wallet" exact component={Wallet} />
            <Route path="/stakings" component={Staking} />
            <Route path="/loans" exact component={Loans} />
            <Route path="/loans/:id" exact />
            <Route path="/transactions" exact component={Transactions} />
            <Route path="/transactions/stakings" exact component={StakingTransactions} />
            <Route path="/transactions/withdrawls" exact component={WithdrawlTransactions} />
            <Route path="/rewards" exact component={Rewards} />
            <Route path="/insurance" exact render={
              () => <div>Coming soon</div>
            } />
          <Route path="/mou" exact component={Mou} />
          </Switch>
        </div>
        <div className="footer section-space20">
          {/* footer */}
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <div className="footer-logo">
                  {/* Footer Logo */}
                  {/* <img src="images/ft-logo.png" alt="Borrow - Loan Company Website Templates" />  */}
                  </div>
                {/* /.Footer Logo */}
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="widget-text mt10">
                  {/* widget text */}
                  <a href="#" className="btn btn-default">Apply for TimeAlly Loan</a>
                  <a href="#" className="btn btn-default">Apply for TimeAlly Club</a>
                  <a href="#" className="btn btn-default">Apply for TimeAlly Insurance</a>
                </div>
                {/* /.widget text */}
              </div>             
              
              
            </div>
          </div>
        </div>
        {/* /.footer */}
        <div className="tiny-footer">
          {/* tiny footer */}
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                <p style={{color:'#fff'}}>© Copyright 2019 | Time Ally</p>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 text-right">
                <p style={{color:'#fff'}}>Terms of use | Privacy Policy</p>
              </div>
            </div>
          </div>
        </div>
       </div>
    </BrowserRouter>
  );
}

export default connect(state => {return{store: state}})(App);
