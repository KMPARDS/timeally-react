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
            <p>TimeAlly is a Decentralized App (DApp) which is based on pre-defined set of rules through Smart Contracts to offers multiple benefits to users, govern the distribution from NRT and hence increasing the value of the Assets (ES) which they hold. <br></br><br></br>
TimeAlly Smart Contract Controls Volatility, Reward Distribution from NRT and simply increase user's Digital Assets (ES) without getting in to the hassle of day trading. You can vest and stake your ES on TimeAlly now.</p>
            <video width={400} controls poster="./images/poster.jpg" style={{boxShadow:'10px 10px 10px #ccc'}}>
          <source src="./images/timeAlly.mp4" type="video/mp4" />
          <source src="mov_bbb.ogg" type="video/ogg" />
          Your browser does not support HTML5 video.
        </video>
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
                <p>TimeAlly users can apply for a loan upto 50% of the amount of ES staked in TimeAlly Smart Contract.</p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="bg-white pinside40 number-block outline mb60 bg-boxshadow">
              <div className="circle"><img src="./images/interest.png"/></div>
                <h3 className="number-title">Competitive Interest Rate</h3>
                <p>TimeAlly Smart Contract offers only 1% Rate of Interest to it's users for a duration of 60 days.</p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="bg-white pinside40 number-block outline mb60 bg-boxshadow">
              <div className="circle"><img src="./images/medal.png"/></div>
                <h3 className="number-title">Interest back to Community</h3>
                <p>The Interest amount collected from TimeAlly will be distributed via Luck-pool to the Community.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="bg-white pinside40 number-block outline mb20 bg-boxshadow">
              <div className="circle"><img src="./images/stocks.png"/></div>
                <h3 className="number-title">Controlling Volatility</h3>
                <p>TimeAlly controls the volatility by controlling the demand and supply dynamics of Era Swap Ecosystems.</p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="bg-white pinside40 number-block outline mb60 bg-boxshadow">
              <div className="circle"><img src="./images/premium.png"/></div>
              
                <h3 className="number-title">Reward Distribution</h3>
                <p>TimeAlly governs the Reward Distribution from NRT based on Ecosystem user's contribution.</p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="bg-white pinside40 number-block outline mb60 bg-boxshadow">
              
              <div className="circle"><img src="./images/fire.png"/></div>
                <h3 className="number-title">Loan Default</h3>
                <p>In case of Loan Default by the user, remaining 50% of the staked tokens will be burnt permanently.</p>
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
                    <p className="text-white">TimeAlly is one of the most important aspect of the Era Swap Ecosystem which meticulously controls the demand and supply dynamics. TimeAlly is a set of Smart Contracts created for vesting and rewards distribution from NRT to each and every user of Era swap Ecosystem platform.<br></br><br></br>
                    TimeAlly rewards token holders for locking their tokens in smart contract for one or two years as per the duration they choose. As these tokens are locked, there are fewer tokens in the circulating supply which will create a scarcity of the ES and will increase the demand.</p>
                    <div className="row">
                      <div className="col-md-6"><img src="./images/a.png"></img></div>
                      <div className="col-md-6"><img src="./images/b.png"></img></div>    
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
                  <p class="read-more-wrap">The insurance policy issued will be based on efficient underwriting norms of smart contract removing middleman and physical processes. No dilution on mortality. <span class="read-more-target">  TimeAlly will create provision for users to get their premium adjustment from TimeAlly payouts, TimeAlly Rewards & TimeAlly Power. TimeAlly insurance will be launched soon as per roadmap.</span></p>  
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
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
              {/* hero-caption */}
              <div className="card-hero-block">
                <h1 className="text-white">How to vest in TimeAlly</h1>
                <p className="text-white">Currently, there are 2 types of plans available in TimeAlly smart contract i.e. 1 year & 2 years vesting plan for vesting. You will get more details about staking through this video. <br></br><br></br>
                <a href="#" className="btn-link-white">Watch the video to know TimeAlly</a> 
                <div className="mt30">
                  <a href="https://www.youtube.com/watch?v=m3WyMh43ns8&t=6s" target="_blank" className="btn btn-default">Watch Now</a>
                </div> 
                <br></br>
                Community members who choose to lock their tokens will be rewarded from NRT pool every month based on their stake and duration selected. With the reduced circulating supply, the worth of ES is expected to go up as well. So, community members who wish to just hold will be benefitted by an increase in the number of tokens as well as the value. </p>        
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
