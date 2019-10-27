import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'; // this is for accessing the store\
import { Dropdown } from 'react-bootstrap';

import Navbar from './containers/Navbar/Navbar';
import Home from './containers/Home/Home';
import CreateWallet from './containers/CreateWallet/CreateWallet';
import LoadWallet from './containers/LoadWallet/LoadWallet';
import Dashboard from './containers/Dashboard/Dashboard';
import ViewAllWorldStakings from './containers/Dashboard/ViewAllWorldStakings';
import Transactions from './containers/Transactions/Transactions';
import StakingTransactions from './containers/Transactions/Stakings';
import WithdrawlTransactions from './containers/Transactions/Withdrawls';
import Wallet from './containers/Wallet/Wallet';
import LoansInfo from './containers/Loans/loans-info';
import Loans from './containers/Loans/Loans';
import Staking from './containers/Stakings/Stakings';
import Mou from './containers/Mou/Mou';
import Rewards from './containers/Rewards/Rewards';
import Assurance from './containers/Assurance/Assurance';
import Logout from './containers/Logout/Logout';

import './App.css';

import provider from './ethereum/provider';
import { esContract, nrtManager, timeally, sip, network } from './env.js';
import nominee from './containers/nominee/nominee';
const ethers = require('ethers');
window.ethers = ethers;
window.redirectHereAfterLoadWallet = '/dashboard';

window.lessDecimals = (ethersBigNumber, decimals = 2) => {
  let lessDecimals = ethers.utils.formatEther(ethersBigNumber).split('.');
  if(lessDecimals[1].length >= decimals) {
    lessDecimals[1] = lessDecimals[1].slice(0, decimals);
  }
  return lessDecimals.join('.');
}
window.sliceDataTo32Bytes = (data, index = 0) => {
  return '0x'+data.slice(2+64*index, 2+64*(index+1));
}

window.getTimeRemaining = totalSeconds => {
  const days = Math.floor(totalSeconds/60/60/24);
  const hours = Math.floor((totalSeconds - days * 60 * 60 * 24) / 60 / 60);
  const minutes = Math.floor((totalSeconds - days * 60 * 60 * 24 - hours * 60 * 60) / 60);
  const seconds = totalSeconds - days * 60 * 60 * 24 - hours * 60 * 60 - minutes * 60;
  return `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
}

// one app login
window.onload = function(){
  !window.opener || window.opener.postMessage("loaded","*");

  document.getElementById('start-loader').style.display = 'none';
  // const element = document.getElementById('start-loader');
  // element.parentElement.removeChild(element);
}
window.addEventListener('message', function(e) {
  setTimeout(() => {
    window.ProcessParentMessage_2(e.data);
  }, 0);
} , false);

function App(props) {

  window.ProcessParentMessage_2 = message => {
    if(message.substring){
      if(message.substring(0,2) == "0x"){
        // wallet = new ethers.Wallet(message);
        props.dispatch({ type: 'LOAD-WALLET-INSTANCE', payload: new ethers.Wallet(message, provider) });
        window.zHistory && window.zHistory.push('/dashboard');
      }
    }
  }

  //for dev purpose 24C4FE6063E62710EAD956611B71825B778B041B18ED53118CE5DA5F02E494BA
  // setTimeout(() => {
  //   if(Object.entries(props.store.walletInstance).length === 0) {
  //     //console.log(provider, new ethers.providers.InfuraProvider('kovan'));
  //     props.dispatch({ type: 'LOAD-WALLET-INSTANCE', payload: new ethers.Wallet('0x24C4FE6063E62710EAD956611B71825B778B041B18ED53118CE5DA5F02E494BA', provider) });
  //   }
  // },0);

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

  // load sip
  if(Object.entries(props.store.sipInstance).length === 0) {
    //console.log(provider, new ethers.providers.InfuraProvider('kovan'));
    props.dispatch({ type: 'LOAD-SIP-INSTANCE', payload: new ethers.Contract(sip.address, sip.abi, provider) });
  }

  return (

    <BrowserRouter>
      <div className="App">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
      {/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" /> */}

        <Navbar/>

        <div style={{margin:'0px'}}>

          <Switch>
            {/* <Route path="/" exact render={() => <p>Home page</p>} /> */}
            <Route path="/" exact component={Home} />
            <Route path="/create-wallet" exact component={CreateWallet} />
            <Route path="/load-wallet" component={LoadWallet} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/view-all-world-staking" exact component={ViewAllWorldStakings} />
            <Route path="/wallet" exact component={Wallet} />
            <Route path="/stakings" component={Staking} />
            <Route path="/nominee" exact component={nominee} />
            <Route path="/loans-info" component={LoansInfo} />
            <Route path="/loans" component={Loans} />
            <Route path="/loans/:id" exact />
            <Route path="/loans" component={Loans} />
            <Route path="/transactions" exact component={Transactions} />
            <Route path="/transactions/stakings" exact component={StakingTransactions} />
            <Route path="/transactions/withdrawls" exact component={WithdrawlTransactions} />
            <Route path="/rewards" exact component={Rewards} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/insurance" exact render={
              () => <div>Coming soon</div>
            } />
            <Route path="/assurance" component={Assurance} />
            <Route path="/mou" exact component={Mou} />
            <Route render={
                () => <div>404 Page not found</div>
              } />
          </Switch>
        </div>
        <div className="footer section-space20" style={{ paddingBottom: '0px'}}>
          {/* footer */}
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="footer-logo" style={{ fontSize: '30px'}}>
                  {/* Footer Logo */}
                  {/* <img src="images/ft-logo.png" alt="Borrow - Loan Company Website Templates" />  */}
                  <ul className="list-unstyled list-inline social2 text-center text-white">
									<li className="list-inline-item">
										<a href="https://github.com/KMPARDS" target="_blank"><i className="fa fa-github"></i></a>
									</li>
									<li className="list-inline-item telegram">
										<a href="https://t.me/eraswap" target="_blank"><i className="fa fa-telegram"></i></a>
									</li>
									<li className="list-inline-item">
										<a href="https://twitter.com/eraswaptec" target="_blank"><i className="fa fa-twitter"></i></a>
									</li>
									<li className="list-inline-item">
										<a href="https://www.facebook.com/eraswap" target="_blank"><i className="fa fa-facebook"></i></a>
									</li>
									<li className="list-inline-item">
										<a href="https://www.instagram.com/eraswap/?hl=en" target="_blank"><i className="fa fa-instagram"></i></a>
									</li>
									<li className="list-inline-item">
										<a href="https://www.youtube.com/channel/UCGCP4f5DF1W6sbCjS6y3T1g?view_as=subscriber" target="_blank"><i className="fa fa-youtube"></i></a>
									</li>
									<li className="list-inline-item">
										<a href="https://www.linkedin.com/company/eraswap/" target="_blank"><i className="fa fa-linkedin"></i></a>
									</li>
									{/* <li className="list-inline-item">
										<a href="https://plus.google.com/u/2/107638861216745114245" target="_blank"><i className="fa fa-google-plus"></i></a>
									</li> */}
									<li className="list-inline-item">
										<a href="https://www.reddit.com/user/EraSwap" target="_blank"><i className="fa fa-reddit"></i></a>
									</li>
									<li className="list-inline-item">
										<a href="https://medium.com/@eraswap" target="_blank"><i className="fa fa-medium"></i></a>
									</li>
									<li className="list-inline-item">
										<a href="https://eraswap.tumblr.com/" target="_blank"><i className="fa fa-tumblr"></i></a>
									</li>
									<li className="list-inline-item">
										<a href="https://mix.com/eraswap" target="_blank"><i className="fa fa-stumbleupon"></i></a>
									</li>
									<li className="list-inline-item">
									<a href="https://www.pinterest.com/eraswapt" target="_blank"><i className="fa fa-pinterest"></i></a>
									</li>
									<li className="list-inline-item">
										<a href="https://bitcointalk.org/index.php?topic=5025979.msg45502457" target="_blank"><i className="fa fa-btc"></i></a>
									</li>
								</ul>
                  </div>
                {/* /.Footer Logo */}
              </div>
            </div>
            <div className="row">
            </div>
          </div>
        </div>
        {/* /.footer */}
        <div className="tiny-footer">
          {/* tiny footer */}
          <div className="container">
            <div className="row">
              {/*<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                <p style={{color:'#fff'}}>Time Ally</p>
              </div>*/}
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style={{ margin: '0 auto' }}>
                <p style={{color:'#fff'}}>
                  <a rel="noopener noreferrer" href="https://etherscan.io/address/0x5630ee5f247bd6b61991fbb2f117bbeb45990876#code" target="_blank"  >TA Smart Contract Address: 0x5630ee5f247Bd6B61991FBB2f117bBEb45990876</a><br/>{/*&nbsp; | &nbsp;*/}
                  <a href="/pdf/TimeAlly_Contract_Security_Software_Testing_Report.pdf" target="_blank"  >Contract, Security, and Software Testing Reports</a> &nbsp; | &nbsp;
                  <a href="/pdf/TimeAlly.pdf" target="_blank" >User Guide</a> &nbsp; | &nbsp;
                  <a href="https://eraswaptoken.io/pdf/eraswap_whitepaper.pdf" target="_blank"  >Era Swap White Paper</a> &nbsp; | &nbsp;
                  <a href="https://eraswaptoken.io/era-swap-howey-test-letter-august7-2018.php" target="_blank"  >Howey Test</a> &nbsp; | &nbsp;
                  <a href="/pdf/TimeAlly-Terms-Use.pdf" target="_blank">Terms of use</a> &nbsp; | &nbsp; <a href="/pdf/TimeAlly-Privacy.pdf" target="_blank">Privacy Policy</a> | &nbsp; <a href="/pdf/TSGAP.pdf" target="_blank">TSGAP</a>
                </p>
              </div>

            </div>
          </div>
        </div>
       </div>
    </BrowserRouter>
  );
}

export default connect(state => {return{store: state}})(App);
