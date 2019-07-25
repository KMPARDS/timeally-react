import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

import { timeally } from '../../env';

const ethers = require('ethers');

class Home extends Component {

  render() {
    return (
 <div>
  <div className="hero-section">
      <div className="container">
        <div className="row">
          <div className="offset-xl-7 col-xl-5 offset-lg-2 col-lg-8 col-md-12 col-sm-12 col-12 ">
            <div className="hero-tab-block">
               <div class="lead-calculator pinside40">
                         <div class="row">
                             <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb10">
                             <div class="card-hero-block">
                                 <h1 class="text-white" style={{fontSize:'30px'}}>TimeAlly Smart Contract</h1>
                                 <p class="text-white">TimeAlly Smart Contract - Controls Volatility, Reward Distribution from ES NRT and simply increase TA Holder’s Era Swap (ES) counts based on their vesting periods without getting in to the hassle of day trading. </p>
                                 <div class="mt30">
                                     <a  onClick={() => this.props.history.push('create-wallet')} class="btn btn-default">Vest Now</a>
                                 </div>
                             </div>
                             </div>
                         </div>
                     </div>
                </div>
            </div>
        </div>
      </div>
    </div>
    <div className="rate-table">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="rate-counter-block">
                <div className="icon rate-icon  "> <img src="images/deposit.png" alt="" className="icon-svg-1x" /></div>
                <div className="rate-box">
                  <h1 className="loan-rate">8,85,854</h1>
                  <small className="rate-title">Staking Amount</small>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="rate-counter-block-second">
              <div className="icon rate-icon  "> <img src="images/tank-truck.png" alt="" className="icon-svg-1x" /></div>
                <div className="rate-box">
                  <h1 className="loan-rate">21,21,558</h1>
                  <small className="rate-title">Available Stakes</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div className="section-space80 bg-light">
    <div className="container">
      <div className="row">
        <div className=" col-xl-12 col-lg-8 col-md-12 col-sm-12 col-12">
          <div className="section-title text-center mb60">
            <h1>What is TimeAlly</h1>
            <p>TimeAlly is a Decentralized App (DApp) which is based on pre-defined set of rules through Smart Contracts to offers multiple benefits to users; govern the distribution from ES NRT and increase Era Swap count for TA Holders which they hold over a period of time. TimeAlly is a DApp ( Decentralized Application ). </p>
            <video  className="mb60" width={400} controls poster="./images/poster.jpg" style={{boxShadow:'10px 10px 10px #ccc'}}>
              <source src="./images/timeAlly.mp4" type="video/mp4" />
              <source src="mov_bbb.ogg" type="video/ogg" />
              Your browser does not support HTML5 video.
            </video>
           <h1>What is DApp</h1>
            <p>Decentralized Applications (DApps) run on a P2P network of computers and are decentralized in nature. They have existed since the advent of P2P networks. DApps uses distributed ledger technology which is neither stored in a centralized location nor managed by any single entity.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="section-space80 mb10">
        <div className="container">
          <div className="row">
            <div className="offset-xl-2 col-xl-8 offset-md-2 col-md-8 offset-md-2 col-md-8 col-sm-12 col-12">
              <div className="mb100 text-center section-title">
                {/* section title start*/}
                <h1>Features of TimeAlly DApp</h1>
                <p>TimeAlly is a DApp which refers to a suite of protocols that define distribution of Newly Released Tokens in a decentralized way. TimeAlly uses Ethereum Virtual Machine (“EVM”), which can execute code of arbitrary algorithmic complexity with no downtimes and keeping all created objects safe from modifying. Every transaction triggered by user are recorded transparently & irreversibly in block confirmation so that old transactions are preserved forever for all to see. TimeAlly is an open source application & can work even without any web interface. </p>
              </div>
              {/* /.section title start*/}
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="bg-white pinside40 number-block outline mb60 bg-boxshadow">
                <div className="circle"><img src="./images/nomination.png"/></div>
                <h3 className="number-title">Nomination</h3>
                <p>TimeAlly users can nominate beneficiaries as nominee, who will receive all the benefits of TimeAlly.</p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="bg-white pinside40 number-block outline mb60 bg-boxshadow">
              <div className="circle"><img src="./images/anonimity.png"/></div>
                <h3 className="number-title">Anonymity</h3>
                <p>TimeAlly Smart Contract provides anonymity to TimeAlly holder offering privacy to users.</p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="bg-white pinside40 number-block outline mb60 bg-boxshadow">
              <div className="circle"><img src="./images/box.png"/></div>
                <h3 className="number-title">ES NRT Distribution</h3>
                <p>TimeAlly governs the distribution of ES from NRT pool to users based on their work.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="bg-white pinside40 number-block outline mb20 bg-boxshadow">
              <div className="circle"><img src="./images/control.png"/></div>
                <h3 className="number-title">Control</h3>
                <p>Nobody can access to user's funds without the private keys which stays with them only.</p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="bg-white pinside40 number-block outline mb60 bg-boxshadow">
              <div className="circle"><img src="./images/less-users.png"/></div>

                <h3 className="number-title">In case of Less Users</h3>
                <p>ES count per user will increase as there will be less users for fixed ES to distribut for staking.</p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="bg-white pinside40 number-block outline mb60 bg-boxshadow">

              <div className="circle"><img src="./images/team.png"/></div>
                <h3 className="number-title">In case of More Users</h3>
                <p>The Value of ES holded by user wil go up as more users will lead to more uses increasing the value.</p>
              </div>
            </div>
          </div>
          {/* <div className="row">
            <div className="offset-xl-2 col-xl-8 offset-md-2 col-md-8 offset-md-2 col-md-8 col-sm-12 col-12 text-center"> <a href="#" className="btn btn-default">View Our Loans</a> </div>
          </div> */}
        </div>
      </div>
      <div className="card-hero-section" style={{paddingBottom:'10px'}}>
            <div className="container">
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  {/* hero-caption */}
                  <div className="card-hero-block text-center">
                    <h1 className="text-white">How TimeAlly works</h1>
                    <p className="text-white">TimeAlly rewards TA holders for locking their tokens in TA smart contract (TA Time Vault) for the duration of one or two years as per their choice. Currently, there are 2 types of plans available in TimeAlly smart contract i.e. 1 year & 2 years vesting plan for vesting.<br></br><br></br>
                    <ul style={{textAlign:'left'}}>
                      <li>Vesting for 1 Year: 13% (1.08% per month) of ES Tokens from NRT pool is allocated to be distributed among TA Vestors who vest tokens for 1 year.</li>
                      <li>Vesting for 2 Year: 15% (1.25% per month) of ES Tokens from NRT pool is allocated  to be distributed among TA Vestors who vest tokens for 2 year.</li>
                    </ul><br/>
                    There is a fixed number of ES rewarded every month to users which is governed by TA smart contract. Total number of ES tokens to be distributed among TA holders is pre-defined, but which user will get how many ES tokens is not defined. It depends on total number of vestors vs total number of token available for TA vesting rewards.</p>
                    <div className="row">
                      <div className="col-md-6">
                        <p className="text-white">If more users opt for TimeAlly vesting then there will be scarcity of liquid tokens which will create more demand of ES. This way the value of ES holded by users is expected to go up as the price per ES shall increase with increasing demand.</p>
                        <img src="./images/a.png"></img>
                      </div>
                      <div className="col-md-6">
                        <p className="text-white">If fewer users opt for TimeAlly vesting then more tokens per user will be received. As the number of tokens to be distributed every month is fixed but the no. of receivers is reduced. This way more ES will be received to these fewer members.</p>
                        <img src="./images/b.png"></img>
                      </div>
                    </div>
                  </div>
                  {/* /.hero-caption */}

                </div>
                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 text-right">
                  <div className="mt10">
                    {/* <img src="./images/TimeAlly-Info-wp.png" alt className="img-fluid" /> */}
                  </div>

                </div>
              </div>
            </div>
          </div>
    <div className="section-space80">
        <div className="container">
          <div className="row">
            <div className="offset-xl-2 col-xl-8 offset-md-2 col-md-8 offset-md-2 col-md-8 col-sm-12 col-12">
              <div className="section-title mb60 text-center">
                {/* section title start*/}
                <h1>More TimeAlly Products</h1>
                <p>There is an extended product line of TimeAlly Smart Contract for users. They are TimeAlly Loan, TimeAlly Club & TimeAlly Insurance for Era Swap Community which stakes ES in TimeAlly Contract. As a TimeAlly Smart Contract holder you can choose any of these add-on products.</p>
              </div>
              {/* /.section title start*/}
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="business-loan-products bg-boxshadow">
              <div className="circle"><img src="./images/jar.png"/></div>
                {/* <div className="loan-products-icon"><img src="./images/medal.png"/></div> */}
                <div className="loan-products-content">
                  <h3>TimeAlly Loan</h3>
                  <input type="checkbox" class="read-more-state" id="post-1" />
                  <p class="read-more-wrap">TimeAlly holders can take a loan of upto 50% of the staked ES for 2 months. The borrower has to pay 1% additional of the borrowed ES for 60 days. <span class="read-more-target"> The additional 1% will be collected in luck pool and distributed back to the community. In case a borrower fails to pay back within 60 days and 12 hours, remaining staked tokens in TimeAlly contract will be burnt. </span></p>
                    <label for="post-1"  class="btn btn-default read-more-trigger"></label>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="business-loan-products bg-boxshadow">
              <div className="circle"><img src="./images/value.png"/></div>
                {/* <div className="loan-products-icon"><i className="flaticon-time-is-money icon-4x icon-primary" /></div> */}
                <div className="loan-products-content">
                  <h3>TimeAlly Club</h3>
                  <input type="checkbox" class="read-more-state" id="post-2" />
                  <p class="read-more-wrap">TimeAlly Club Card, a premium membership card for Era Swap Community, will provide the users with additional benefits of rewards along with <span class="read-more-target">exclusive membership benefits like Utility Bill Payments, Travel & Holidays, Dine-out, Education, Health & Fitness, etc. It will be available in 5 categories: Silver, Gold, Diamond, Emerald and Ruby.</span></p>
                    <label for="post-2"  class="btn btn-default read-more-trigger"></label>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="business-loan-products bg-boxshadow">
              <div className="circle"><img src="./images/life-insurance.png"/></div>
                {/* <div className="loan-products-icon"><i className="flaticon-rich icon-4x icon-primary" /></div> */}
                <div className="loan-products-content">
                  <h3>TimeAlly Insurance</h3>
                  <input type="checkbox" class="read-more-state" id="post-3" />
                  <p class="read-more-wrap">The insurance policy issued will be based on efficient underwriting norms of smart contract removing middleman and physical processes. No dilution on mortality. <span class="read-more-target">  TimeAlly will create provision for users to get their premium adjustment from TimeAlly payouts, TimeAlly Rewards & TimeAlly Power. TimeAlly insurance will be launched soon for community.</span></p>
                    <label for="post-3"  class="btn btn-default read-more-trigger"></label>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="card-hero-section ">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              {/* hero-caption */}
              <div className="card-hero-block text-center">
                <h1 className="text-white">Invest now in TimeAlly</h1>
                <p className="text-white">TimeAlly is a smart contract driven DApp, where anyone can vest ES tokens to receive rewards. These rewards are in the format of ES based on the vesting duration (1 or 2 years). <br></br><br></br>For 1 year the holders are rewarded with the distribution of 13% ES NRT and for 2 years holding, the users receive 15% from ES NRT.<br></br><br></br>
                <a className="btn-link-white">Watch the video for TimeAlly activation</a>
                <br></br> <br></br>
                <video  className="mb60" width={400} controls poster="./images/poster.jpg">
                  <source src="./images/timeAlly.mp4" type="video/mp4" />
                  <source src="mov_bbb.ogg" type="video/ogg" />
                  Your browser does not support HTML5 video.
                </video>
                <h2 className="text-white">Power Token</h2>
                TimeAlly is a simple plan based on vesting where users receive an additional benefits of Power Token which they can distribute among the ES community on TimeSwappers platform. The amont of Power token receive by each TimeAlly holder is directly proportional the amount of ES he holds in TA smart contract. <br></br><br></br>To know more about power token the user can read Era Swap White Paper</p>
              </div>
              {/* /.hero-caption */}

            </div>
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 text-right">
              <div className="mt10">
                {/* <img src="./images/TimeAlly-Info-wp.png" alt className="img-fluid" /> */}
              </div>

            </div>
          </div>
        </div>
      </div>
  </div>
    );
  }
};

export default connect(state => {return{store: state}})(withRouter(Home));
