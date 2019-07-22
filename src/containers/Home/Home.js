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
                                 <p class="text-white">Controls Volatility, Reward Distribution from NRT and simply increase user's Digital Assets (ES) without getting in to the hassle of day trading.</p>
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
            <p>TimeAlly is one of the most important aspect of the Era Swap Ecosystem which meticulously controls the demand and supply dynamics. TimeAlly is a set of Smart Contracts created for vesting and reward distribution from NRT to each and every user of Era swap Ecosystem platforms.<br></br><br></br>
TimeAlly rewards token holders for locking their tokens in smart contract for one or two years as per the duration they choose. As these tokens are locked, there are fewer tokens in the circulating supply which will create a scarcity of the ES and will increase the demand.<br></br><br></br>
Thus, the value for every ES will rise in the long run, benefiting the vestors. Watch this Video to know more about TimeAlly.

</p>
            <video width={800} controls poster="./images/poster.jpg" style={{boxShadow:'10px 10px 10px #ccc'}}>
          <source src="./images/timeAlly.mp4" type="video/mp4" />
          <source src="mov_bbb.ogg" type="video/ogg" />
          Your browser does not support HTML5 video.
        </video>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className=" section-space80 mb80">
        <div className="container">
          <div className="row">
            <div className="offset-xl-2 col-xl-8 offset-md-2 col-md-8 offset-md-2 col-md-8 col-sm-12 col-12">
              <div className="mb100 text-center section-title">
                {/* section title start*/}
                <h1>Benefits of TimeAlly for EraSwap Community</h1>
                <p>TimeAlly is a Decentralised App (DApp) which is based on pre-defined set of rules through Smart Contracts to offers multiple benefits to users, govern the distribution from NRT and hence increasing the value of the Assets  (ES) which they hold .</p>
              </div>
              {/* /.section title start*/}
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="bg-white pinside40 number-block outline mb60 bg-boxshadow">
                <div className="circle"><img src="./images/loan.png"/></div>
                <h3 className="number-title">Flexible Credit Line</h3>
                <p>TimeAlly users can apply for a loan upto 50% of the amount ES staked in TimeAlly Smart Contract.</p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="bg-white pinside40 number-block outline mb60 bg-boxshadow">
              <div className="circle"><img src="./images/interest.png"/></div>
                <h3 className="number-title">Best Interest Rate</h3>
                <p>TimeAlly Smart Contract offers only 1% Rate of Interest to it's users for a duration of 60 days.</p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="bg-white pinside40 number-block outline mb60 bg-boxshadow">
              <div className="circle"><img src="./images/medal.png"/></div>
                <h3 className="number-title">Interest for Community</h3>
                <p>The Interest amount collected from TimeAlly will be distributed via Luckpool to the Community.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="bg-white pinside40 number-block outline mb20 bg-boxshadow">
              <div className="circle"><img src="./images/fire.png"/></div>
                <h3 className="number-title">Loan Default</h3>
                <p>Incase of Loan default by the user the remaning 50% of the staked tokens will be burnt permanently. </p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="bg-white pinside40 number-block outline mb60 bg-boxshadow">
              <div className="circle"><img src="./images/stocks.png"/></div>
                <h3 className="number-title">Controlling Volatility</h3>
                <p>TimeAlly controls the volatility by controlling the demand and supply dynamics of EraSwap Ecosystems.</p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="bg-white pinside40 number-block outline mb60 bg-boxshadow">
              <div className="circle"><img src="./images/premium.png"/></div>
                <h3 className="number-title">Reward Distribution</h3>
                <p>TimeAlly governs the Reward Distribution from NRT based on EcoSystem user's contribution.</p>
              </div>
            </div>
          </div>
          {/* <div className="row">
            <div className="offset-xl-2 col-xl-8 offset-md-2 col-md-8 offset-md-2 col-md-8 col-sm-12 col-12 text-center"> <a href="#" className="btn btn-default">View Our Loans</a> </div>
          </div> */}
        </div>
      </div>
  <div className="card-hero-section ">
        <div className="container">
          <div className="row">
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
              {/* hero-caption */}
              <div className="card-hero-block">
                <h1 className="text-white">TimeAlly User Nominiee Benefits</h1>
                <p className="text-white">A TimeAlly User nominee is a person who is nominated in TimeAlly smart contract by user to receive the benefit of TimeAlly smart contract in case he no longer exists. This TimeAlly contract holder will have the option to appoint the nominee.<br></br>

The nominee can claim the benefits in case the TimeAlly owner does not remain active for (staked year/s + 12 Months)</p>
                <span className="icon rate-done mb10 mr20"></span> <a href="#" className="btn-link-white">Watch the video to appoint nominee</a>  
                <div className="mt30">
                  <a href="#" className="btn btn-default">Appoint Nominee Now</a>
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
                <p>Below are the extended product line of TimeAlly Smart Contract for users. They are TimeAlly Loan, TimeAlly Club & TimeAlly Insurance for EraSwap Community which stakes ES in TimeAlly Contract. As a TimeAlly Smart Contract holders you can choose any of these addon products.</p>
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
                  <p class="read-more-wrap">TimeAlly  holders can take a loan of upto 50% of the staked ES for 2 months. The  borrower has to pay 1%  additional of the borrowed ES for 60 days.<span class="read-more-target"> The additional 1% will be collected in luck pool and distributed back to the community. In case a borrower fails to pay back within 60 days and 12 hours, remaining staked tokens in TimeAlly contract will be burnt. </span></p>                    
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
                  <p class="read-more-wrap">TimeAlly Club Card, a premium membership card for Era Swap Community, will provide the users with additional benefits of rewards along with <span class="read-more-target">exclusive membership benefits like Utility Bill Payments, Travel & Holidays, Dine-out,  Education, Health & Fitness, etc.  It will be available in 5 categories: Silver, Gold, Diamond, Emerald and Ruby.</span></p>                    
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
                  <p class="read-more-wrap">The insurance policy issued will be based on efficient underwriting norms of smart contract removing middleman and physical processes. No dilution on mortality. <span class="read-more-target">   TimeAlly will create provision for users to get their premium adjustment from  TimeAlly payouts, TimeAlly Rewards & TimeAlly Power.</span></p>                    
                    <label for="post-3"  class="btn btn-default read-more-trigger"></label>
                </div>
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
