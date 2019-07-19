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
import Staking from './containers/Stakings/Stakings';

import { Button } from 'react-bootstrap';

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
              <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                <div className="row">
                  <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
                    <h3 className="newsletter-title">Signup Our Newsletter</h3>
                  </div>
                  <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
                    <div className="newsletter-form">
                      {/* Newsletter Form */}
                      <form action="newsletter.php" method="post">
                        <div className="input-group">
                          <input type="email" className="form-control" id="newsletter" name="newsletter" placeholder="Write E-Mail Address" required />
                          <span className="input-group-btn">
                            <button className="btn btn-default" type="submit">Go!</button>
                          </span> </div>
                        {/* /input-group */}
                      </form>
                    </div>
                    {/* /.Newsletter Form */}
                  </div>
                </div>
                {/* /.col-lg-6 */}
              </div>
            </div>
            <hr className="dark-line" />
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="widget-text mt10">
                  {/* widget text */}
                  <p>Our goal at Borrow Loan Company is to provide access to personal loans and education loan, car loan, home loan at insight competitive interest rates lorem ipsums. We are the loan provider, you can use our loan product.</p>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                      <p className="address-text"><span><i className="icon-placeholder-3 icon-1x" /> </span>3895 Sycamore Road Arlington, 97812 </p>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                      <p className="call-text"><span><i className="icon-phone-call icon-1x" /></span>800-123-456</p>
                    </div>
                  </div>
                </div>
                {/* /.widget text */}
              </div>
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-6">
                <div className="widget-footer mt40">
                  {/* widget footer */}
                  <ul className="listnone">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">About Us</a></li>                   
                  </ul>
                </div>
                {/* /.widget footer */}
              </div>
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-6">
                <div className="widget-footer mt40">
                  {/* widget footer */}
                  <ul className="listnone">
                    <li><a href="#">Car Loan</a></li>
                    <li><a href="#">Personal Loan</a></li>
                    <li><a href="#">Education Loan</a></li>                   
                  </ul>
                </div>
                {/* /.widget footer */}
              </div>
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-6">
                <div className="widget-social mt40">
                  {/* widget footer */}
                  <ul className="listnone">
                    <li><a href="#"><i className="fa fa-facebook" />Facebook</a></li>
                    <li><a href="#"><i className="fa fa-google-plus" />Google Plus</a></li>                    
                  </ul>
                </div>
                {/* /.widget footer */}
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
                <p>© Copyright 2016 | Borrow Loan Company</p>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 text-right">
                <p>Terms of use | Privacy Policy</p>
              </div>
            </div>
          </div>
        </div>
       </div>      
    </BrowserRouter>
  );
}

export default connect(state => {return{store: state}})(App);
