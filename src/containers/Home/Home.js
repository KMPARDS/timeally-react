import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Button, Accordion } from 'react-bootstrap';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { timeally } from '../../env';

// import Loader from 'react-loader-spinner';
// export default class App extends React.Component {

const ethers = require('ethers');

class Home extends Component {
  state = {
    nrt: '',
    totalActiveStakingsNextMonth: ''
  }

  componentDidMount = async () => {
    const currentMonth = await this.props.store.timeallyInstance.functions.getCurrentMonth();
    (async()=>{
      const totalActiveStakingsNextMonth = await this.props.store.timeallyInstance.functions.totalActiveStakings(currentMonth.add(1));

      this.setState({ totalActiveStakingsNextMonth: ethers.utils.commify(window.lessDecimals(totalActiveStakingsNextMonth)) });
    })();
    (async()=>{
      const nrt = await this.props.store.timeallyInstance.functions.timeAllyMonthlyNRT(currentMonth);

      this.setState({ nrt: ethers.utils.commify(window.lessDecimals(nrt)) });
    })();
  };

  render() {
    return (

 <div>
  <div className="hero-section">
      <div className="container">
        <div className="row">
          <div className="offset-xl-7 col-xl-5 offset-lg-2 col-lg-8 col-md-12 col-sm-12 col-12 ">
            <div className="hero-tab-block">
               <div className="lead-calculator pinside40">
                         <div className="row">
                             <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb10">
                             <div className="card-hero-block">
                                 <h1 className="text-white" style={{fontSize:'30px'}}>TimeAlly Smart Contract</h1>
                                 <p className="text-white">TimeAlly Smart Contract - Controls Volatility, Reward Distribution from ES NRT and simply increase TA Holder’s Era Swap (ES) counts based on their vesting periods without getting in to the hassle of day trading. </p>
                                 <div className="mt30">
                                     <a  onClick={() => {
                                         if(this.props.store.walletInstance.address) {
                                           this.props.history.push('stakings/new')
                                         } else {
                                           this.props.history.push('create-wallet')
                                         }
                                       }} className="btn btn-default">Vest Now</a>
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
            <div className="col-md-6">
              <div className="rate-counter-block">
                <div className="icon rate-icon  "> <img src="images/deposit.png" alt="" className="icon-svg-1x" /></div>
                <div className="rate-box">
                  <h1 className="loan-rate">{this.state.nrt ? this.state.nrt + ' ES' : 'Loading...'}</h1>
                  <small className="rate-title">NRT Released in this month for TimeAlly</small>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="rate-counter-block-second">
              <div className="icon rate-icon  "> <img src="images/tank-truck.png" alt="" className="icon-svg-1x" /></div>
                <div className="rate-box">
                  <h1 className="loan-rate">{this.state.totalActiveStakingsNextMonth ? this.state.totalActiveStakingsNextMonth + ' ES' : 'Loading...'}</h1>
                  <small className="rate-title">Total Active Stakes in next month</small>
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
          <h1>What is DApp</h1>
            <p>Decentralized Applications (DApp) is open source application that runs autonomously on decentralized public blockchain. They have existed since the advent of P2P network. DApp uses distributed ledger technology which is neither stored in centralized location nor can be controlled by single entity. It generates & uses tokens by following a standard cryptographic algorithm. <br></br>
            </p>
            <hr/>
              <h1>What is TimeAlly</h1>
            <p>TimeAlly is a Decentralized App (DApp) which is based on pre-defined set of rules through Smart Contracts to offers multiple benefits to users, govern the generation & distribution of ES Newly released Token. TimeAlly increase Era Swap count for TimeAlly contract holders for holding tokens over a period of time.</p>

            <p><a style={{color: 'black', textDecoration: 'underline'}} href="https://www.youtube-nocookie.com/embed/DM6hvVaCu_g?rel=0&amp" target="_blank">Click to open TimeAlly Teaser in a new tab</a></p>

            <p><a style={{color: 'black', textDecoration: 'underline'}} href="https://www.youtube-nocookie.com/embed/vfgf2pvYSoc?rel=0&amp" target="_blank">Click to open TimeAlly Walkthrough in a new tab</a></p>

            <p><a style={{color: 'black', textDecoration: 'underline'}} href="/pdf/TimeAlly_DApp.pdf" target="_blank">View the TimeAlly Presenter</a></p>

            {/*<div className="row">
                <div className="offset-md-2 col-md-4">
                  <div style={{position: 'relative', height: 0, overflow: 'hidden', maxWidth: '100%', paddingBottom: '56.25%', marginBottom:'20px'}}>
                      <iframe src="https://www.youtube-nocookie.com/embed/DM6hvVaCu_g?rel=0&amp;showinfo=0" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} frameBorder={0} allowFullScreen />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div style={{position: 'relative', height: 0, overflow: 'hidden', maxWidth: '100%', paddingBottom: '56.25%'}}>
                      <iframe style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} src="https://www.youtube-nocookie.com/embed/vfgf2pvYSoc?rel=0&amp;showinfo=0" frameBorder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  </div>
                </div>
              </div>*/}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="section-space80 mb10">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-md-12 col-md-12 col-sm-12 col-12">
              <div className="mb100 text-center section-title">
                {/* section title start*/}
                <h1>Features of TimeAlly</h1>
                <p>TimeAlly is a DApp which refers to a suite of protocols that define distribution of Newly Released Era Swap (ES) Tokens in a decentralized way. TimeAlly uses Ethereum Virtual Machine (“EVM”), which can execute code of arbitrary algorithmic complexity following standard cryptography with no downtime and keeping all created objects safe from modifying. Every transaction triggered by users are recorded transparently & irreversibly in block confirmation so that old transactions are preserved forever for all to see. TimeAlly is an open source application & can work even without any web interface.</p>
                <a rel="noopener noreferrer" className="btn btn-default" href="https://etherscan.io/address/0x5630ee5f247bd6b61991fbb2f117bbeb45990876#code" target="_blank" ><p style={{color:'#fff'}}>View TA Smart Contract</p></a>
              </div>
              {/* /.section title start*/}
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="bg-white pinside30 number-block outline mb60 bg-boxshadow">
                <div className="circle"><img src="./images/nomination.png"/></div>
                <h3 className="number-title">Nomination</h3>
                <p>Appoint nominee, who will receive all the benefits of TimeAlly.</p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="bg-white pinside30 number-block outline mb60 bg-boxshadow">
              <div className="circle"><img src="./images/anonimity.png"/></div>
                <h3 className="number-title">Privacy</h3>
                <p>TimeAlly Smart Contract provides privacy to TimeAlly holder.</p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="bg-white pinside30 number-block outline mb60 bg-boxshadow">
              <div className="circle"><img src="./images/box.png"/></div>
                <h3 className="number-title">ES NRT Distribution</h3>
                <p>Governs the distribution of ES from NRT pool to users.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="bg-white pinside30 number-block outline mb20 bg-boxshadow">
              <div className="circle"><img src="./images/control.png"/></div>
                <h3 className="number-title">Control</h3>
                <p>The private keys stays with the user only giving control.</p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="bg-white pinside30 number-block outline mb60 bg-boxshadow">
              <div className="circle"><img src="./images/less-users.png"/></div>

                <h3 className="number-title">In case of Less Users</h3>
                <p>ES count per user will increase for less users to distribute for staking.</p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="bg-white pinside30 number-block outline mb60 bg-boxshadow">

              <div className="circle"><img src="./images/team.png"/></div>
                <h3 className="number-title">In case of More Users</h3>
                <p>The Value of ES holded may go up as more usage increases value.</p>
              </div>
            </div>
          </div>
          {/* <div className="row">
            <div className="offset-xl-2 col-xl-8 offset-md-2 col-md-8 offset-md-2 col-md-8 col-sm-12 col-12 text-center"> <a href="#" className="btn btn-default">View Our Loans</a> </div>
          </div> */}
        </div>
      </div>
      <div className="card-hero-section" style={{paddingBottom:'50px'}}>
            <div className="container">
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  {/* hero-caption */}
                  <div className="card-hero-block text-center">
                    <h1 className="text-white">How TimeAlly works</h1>
                    <p className="text-white">TimeAlly rewards TA holders for locking their tokens in TA smart contract (TA Time Vault) for the duration of one or two years as per their choice.</p><br></br>
                    <ul style={{textAlign:'left', color:'#fff'}}>
                      <li>Vesting for 1 Year: 13% (1.08% per month) of ES Tokens from NRT pool is allocated to be distributed among TA Vestors. </li>
                      <li>Vesting for 2 Year: 15% (1.25% per month) of ES Tokens from NRT pool is allocated  to be distributed among TA Vestors.</li>
                      <li>All the Rewards will be distributed 50% in TimeAlly & 50 % in Liquid.</li>
                    </ul>
                    <p style={{color:'#fff'}}>
                    There is a fixed number of ES rewarded every month to users which is governed by TA smart contract. Total number of ES tokens to be distributed among TA holders is pre-defined, but which user will get how many ES tokens is not defined. It depends on number of token staked in proportion to their vesting plans.</p>
                    <div className="row">
                      <div className="col-md-6">
                        <h2 className="text-white">In case of more users</h2>
                        <img src="./images/a.png"></img>
                        <p className="text-white">If more users opt for TimeAlly vesting then there will be scarcity of liquid tokens which will create more demand of ES. This way the value of ES holded by users is expected to go up as the price per ES shall increase with increasing demand.</p>
                      </div>
                      <div className="col-md-6">
                        <h2 className="text-white">In case of few users</h2>
                        <img src="./images/b.png"></img>
                        <p className="text-white">If few users opt for TimeAlly vesting then more tokens per user will be received. As the number of tokens to be distributed every month is fixed but the number of receivers is reduced. This way more ES will be received to these fewer members.</p>
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
                  <input type="checkbox" className="read-more-state" id="post-1" />
                  <p className="read-more-wrap">TimeAlly holders will get opportunity to avail loan upto 50% for a duration of 2 months after consuming 75% of contract period. More plan options will be introduced after <span className="read-more-target"> deployment of 1 year & 2 year vesting initial plans. The borrower has to pay 1% additional of the borrowed ES for 60 days. The additional 1% will be collected in luck pool and distributed back to the community. In case a borrower fails to pay back within 60 days and 12 hours, remaining staked tokens in TimeAlly contract will be burnt.
 </span></p>
                    <label htmlFor="post-1"  className="btn btn-default read-more-trigger"></label>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="business-loan-products bg-boxshadow">
              <div className="circle"><img src="./images/value.png"/></div>
                {/* <div className="loan-products-icon"><i className="flaticon-time-is-money icon-4x icon-primary" /></div> */}
                <div className="loan-products-content">
                  <h3>TimeAlly Club</h3>
                  <input type="checkbox" className="read-more-state" id="post-2" />
                  <p className="read-more-wrap">TimeAlly Club, a premium membership offering for Era Swap Community, will provide the users with additional benefits of rewards along with <span className="read-more-target">exclusive membership benefits like Utility Bill Payments, Travel & Holidays, Dine-out, Education, Health & Fitness, etc. It will be available in 5 categories: Silver, Gold, Diamond, Emerald and Ruby.</span></p>
                    <label htmlFor="post-2"  className="btn btn-default read-more-trigger"></label>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="business-loan-products bg-boxshadow">
              <div className="circle"><img src="./images/life-insurance.png"/></div>
                {/* <div className="loan-products-icon"><i className="flaticon-rich icon-4x icon-primary" /></div> */}
                <div className="loan-products-content">
                  <h3>TimeAlly Insurance</h3>
                  <input type="checkbox" className="read-more-state" id="post-3" />
                  <p className="read-more-wrap">The insurance policy issued will be based on efficient underwriting norms of smart contract removing middleman and physical processes. No dilution on mortality. <span className="read-more-target">  TimeAlly will create provision for users to get their premium adjustment from TimeAlly payouts, TimeAlly Rewards & TimeAlly Power. TimeAlly insurance will be launched soon for community.</span></p>
                    <label htmlFor="post-3"  className="btn btn-default read-more-trigger"></label>
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
                <h1 className="text-white">Power <img src="./images/pt.png" style={{height:'69px'}} /> Tokens</h1>
                <p className="text-white">Power Tokens are additional 10% of NRT allocated every month to TimeAlly vestors. Power Tokens are allocated to the TimeAlly members in a ratio 10:1 per year. The Power Tokens can be uses to encourage, appreciate, donate to friends, family, collegues on Swappers Wall and services on Time Swappers & Buzcafe.<br></br>To know more about power token the user can read <a href="https://eraswaptoken.io/pdf/eraswap_whitepaper.pdf" target="_blank" >Era Swap White Paper</a><br></br><br></br>
                <strong>Use Power Tokens on below platforms</strong>
                </p>
                 <div className="col-md-12">
                    <span style={{marginLeft:'10px'}}>
                      <a href="http://timeswappers.com/home" target="_blank" >
                       <img src="./images/swp_bz-01.png" style={{ height:'80px'}}></img>
                      </a>
                    </span>
                    <span style={{marginLeft:'10px'}}>
                      <a href="http://timeswappers.com" target="_blank" >
                       <img src="./images/ts.png" style={{ height:'80px'}}></img>
                      </a>
                    </span>
                    <span style={{marginLeft:'10px'}}>
                       <img src="./images/swp_bz-02.png" style={{ height:'80px'}}></img>
                    </span>
                  </div>
                  <br></br>
                  <p><a style={{color: 'white', textDecoration: 'underline'}} href="https://www.youtube-nocookie.com/embed/V3PtAX_GMjw?rel=0&amp" target="_blank">Click to open Power Token Insights Video in a new tab</a></p>
                  <p><a style={{color: 'white', textDecoration: 'underline'}} href="https://www.youtube-nocookie.com/embed/a89tFlAQ2vY?rel=0&amp" target="_blank">Click to open SwappersWall Video in a new tab</a></p>
                {/*<div className="row">
                  <div className="offset-md-2 col-md-4">
                    <div style={{position: 'relative', height: 0, overflow: 'hidden', maxWidth: '100%', paddingBottom: '56.25%', marginBottom:'20px'}}>
                        <iframe src="https://www.youtube-nocookie.com/embed/V3PtAX_GMjw?rel=0&amp;showinfo=0" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} frameBorder={0} allowFullScreen />
                      </div>
                  </div>

                  <div className="col-md-4">
                    <div style={{position: 'relative', height: 0, overflow: 'hidden', maxWidth: '100%', paddingBottom: '56.25%'}}>
                      <iframe style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} src="https://www.youtube-nocookie.com/embed/a89tFlAQ2vY?rel=0&amp;showinfo=0" frameBorder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                  </div>
                </div>*/}
                <div className="row">
                  {/* <div className="col-md-4">
                    <img src="./images/swp_bz-01.png"></img>
                  </div> */}

                  {/* <div className="col-md-4">
                  <img src="./images/swp_bz-02.png"></img>
                  </div> */}
                </div>
                {/* <a className="btn-link-white">Watch the video for TimeAlly activation</a> */}
                {/* <div style={{position: 'relative', height: 0, overflow: 'hidden', maxWidth: '100%', paddingBottom: '56.25%'}}>
                    <iframe width="560" height="315" style={{position: 'absolute', top: 0, left: 0,}} src="https://www.youtube-nocookie.com/embed/X0SV9pGQls4?rel=0&amp;showinfo=0" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  </div> */}
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
      <div className="section-space80 bg-white">
        <div className="container">
          <div className="row">
            <div className="offset-xl-2 col-xl-8 offset-md-2 col-md-8 offset-md-2 col-md-8 col-sm-12 col-12">
              <div className="text-center section-title">
                {/* section title start*/}
                <h1>FAQ's</h1>
                <hr></hr>
              </div>
              {/* /.section title start*/}
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="bg-white">
                    <Accordion defaultActiveKey="0" style={{textAlign:'left'}}>
                      <Card style={{color:'#3c4d6b', marginBottom:'0px', fontWeight:'500', borderRight:'0px', borderLeft:'0px', borderTop:'0px', padding: '10px 0px 10px 30px'}}>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                          Q-1. &nbsp; What is Era Swap Token?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body style={{color:'#333', fontSize:'14px', fontWeight:'300'}}>Era Swap Token or ES is a decentralized utility token currently based on Ethereum blockchain (ERC20) which will be used on multiple platforms for exchange of services(P2P), avail discounts, get rewards and many more utility.</Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card style={{color:'#3c4d6b', marginBottom:'0px', fontWeight:'500', borderRight:'0px', borderLeft:'0px', borderTop:'1px solid #ccc', padding: '10px 0px 10px 30px'}}>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                          Q-2. &nbsp; What is TimeAlly DApp?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                          <Card.Body style={{color:'#333', fontSize:'14px', fontWeight:'300'}}>TimeAlly is a Decentralized App (DApp) which is based on pre-defined set of rules through Smart Contracts to offers multiple benefits to users, govern the generation & distribution of ES Newly released Token. <br></br><br></br>
                          <h4 style={{textAlign:'center'}}>Please watch this videos to understand .</h4>
                          <p style={{textAlign: 'center'}}><a style={{color: 'black', textDecoration: 'underline'}} href="https://www.youtube-nocookie.com/embed/Xqx8wEGQNXE?rel=0&amp" target="_blank">Click to open the <u>TimeAlly Tour</u> Video in a new tab</a></p>
                          <div className="row">
                            <div className="offset-md-4 col-md-4">

                                {/*<div style={{position: 'relative', height: 0, overflow: 'hidden', maxWidth: '100%', paddingBottom: '56.25%', marginBottom:'20px'}}>
                                  <iframe src="https://www.youtube-nocookie.com/embed/Xqx8wEGQNXE?rel=0&amp;showinfo=0" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} frameBorder={0} allowFullScreen />
                                </div>*/}
                             </div>
                           </div>
                           <p style={{textAlign: 'center'}}><a style={{color: 'black', textDecoration: 'underline'}} href="https://www.youtube-nocookie.com/embed/vfgf2pvYSoc?rel=0&amp" target="_blank">Click to open the <u>TimeAlly Quick Walk Through</u> Video in a new tab</a></p>
                           <div className="row">
                            <div className="offset-md-4 col-md-4">
                                {/*<div style={{position: 'relative', height: 0, overflow: 'hidden', maxWidth: '100%', paddingBottom: '56.25%', marginBottom:'20px'}}>
                                    <iframe src="https://www.youtube-nocookie.com/embed/vfgf2pvYSoc?rel=0&amp;showinfo=0" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} frameBorder={0} allowFullScreen />
                                </div>*/}
                             </div>
                           </div>
                           <p style={{textAlign: 'center'}}><a style={{color: 'black', textDecoration: 'underline'}} href="https://www.youtube-nocookie.com/embed/DM6hvVaCu_g?rel=0&amp" target="_blank">Click to open the <u>TimeAlly Teaser</u> Video in a new tab</a></p>
                           <div className="row">
                            <div className="offset-md-4 col-md-4">
                                <div style={{position: 'relative', height: 0, overflow: 'hidden', maxWidth: '100%', paddingBottom: '56.25%', marginBottom:'20px'}}>
                                    <iframe src="https://www.youtube-nocookie.com/embed/DM6hvVaCu_g?rel=0&amp;showinfo=0" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} frameBorder={0} allowFullScreen />
                                </div>
                             </div>
                           </div>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card style={{color:'#3c4d6b', marginBottom:'0px', fontWeight:'500', borderRight:'0px', borderLeft:'0px', padding: '10px 0px 10px 30px'}}>
                        <Accordion.Toggle as={Card.Header} eventKey="2">
                        Q-3. &nbsp; How to claim your staking in TimeAlly
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                          <Card.Body style={{color:'#333', fontSize:'14px', fontWeight:'300'}}>
                          Please watch this video on how to claim your staking in TimeAlly DApp.<br></br><br></br>
                          <p style={{textAlign: 'center'}}><a style={{color: 'black', textDecoration: 'underline'}} href="https://www.youtube-nocookie.com/embed/31PT42RIOQs?rel=0&amp" target="_blank">Click to open the Video in a new tab</a></p>
                          <div className="row">
                              <div className="offset-md-4 col-md-4">
                              <div style={{position: 'relative', height: 0, overflow: 'hidden', maxWidth: '100%', paddingBottom: '56.25%', marginBottom:'20px'}}>
                                  {/*<iframe src="https://www.youtube-nocookie.com/embed/31PT42RIOQs?rel=0&amp;showinfo=0" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} frameBorder={0} allowFullScreen />*/}
                              </div>

                              </div>
                            </div>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card style={{color:'#3c4d6b', marginBottom:'0px', fontWeight:'500', borderRight:'0px', borderLeft:'0px', padding: '10px 0px 10px 30px'}}>
                        <Accordion.Toggle as={Card.Header} eventKey="3">
                        Q-4. &nbsp; How to vest in TimeAlly?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="3">
                          <Card.Body style={{color:'#333', fontSize:'14px', fontWeight:'300'}}>
                            One can vest in TimeAlly just by locking up ES in TimeAlly smart contract for a vesting period of 1 year or 2 years.<br></br><br></br>

                            <div className="col-md-4 offset-md-4">
                            <strong style={{textAlign:'center'}}>Please watch this video on how to stake in TimeAlly.</strong>
                            <p style={{textAlign: 'center'}}><a style={{color: 'black', textDecoration: 'underline'}} href="https://www.youtube-nocookie.com/embed/3msYFRo9d4E?rel=0&amp" target="_blank">Click to open the Video in a new tab</a></p> <br></br><br></br>
                              <div style={{position: 'relative', height: 0, overflow: 'hidden', maxWidth: '100%', paddingBottom: '56.25%'}}>
                                {/*<iframe style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} src="https://www.youtube-nocookie.com/embed/3msYFRo9d4E?rel=0&amp;showinfo=0" frameBorder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>*/}
                              </div>
                            </div>

                            <br></br>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card style={{color:'#3c4d6b', marginBottom:'0px', fontWeight:'500', borderRight:'0px', borderLeft:'0px', padding: '10px 0px 10px 30px'}}>
                        <Accordion.Toggle as={Card.Header} eventKey="4">
                        Q-5. &nbsp; How to do staking of TimeAlly on Etherscan?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="4">
                          <Card.Body style={{color:'#333', fontSize:'14px', fontWeight:'300'}}>
                            <div className="col-md-4 offset-md-4">
                            <strong style={{textAlign:'center'}}>Please watch this video on how to do staking of TimeAlly on Etherscan.</strong> <br></br><br></br>
                            <p style={{textAlign: 'center'}}><a style={{color: 'black', textDecoration: 'underline'}} href="https://www.youtube-nocookie.com/embed/Jtc3unocmEA?rel=0&amp" target="_blank">Click to open the Video in a new tab</a></p>
                              <div style={{position: 'relative', height: 0, overflow: 'hidden', maxWidth: '100%', paddingBottom: '56.25%'}}>
                              {/*  <iframe style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} src="https://www.youtube-nocookie.com/embed/Jtc3unocmEA?rel=0&amp;showinfo=0" frameBorder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>*/}
                              </div>
                            </div>
                            <br></br>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card style={{color:'#3c4d6b', marginBottom:'0px',fontWeight:'500', borderRight:'0px', borderLeft:'0px', padding: '10px 0px 10px 30px'}}>
                        <Accordion.Toggle as={Card.Header} eventKey="5">
                        Q-6. &nbsp; What benefit user gets on locking up their ES in TimeAlly?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="5">
                          <Card.Body style={{color:'#333', fontSize:'14px', fontWeight:'300'}}>
                            <p>Vestors get the below mentioned benefits<br></br>
                            Vesting for 1 Year: 13% newly release token from NRT will be allocated for TimeAlly vestors.<br></br>
                            {/* Vesting for 1 Year: 13% (1.08% per month) of ES Tokens from NRT pool is allocated to be distributed among TA Vestors who vest tokens for 1 year.<br></br> */}
                            Vesting for 2 Year: 15% (1.25% per month) of ES Tokens from NRT pool is allocated for TA Vestors.
                              </p>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card style={{color:'#3c4d6b', marginBottom:'0px', fontWeight:'500', borderRight:'0px', borderLeft:'0px', padding: '10px 0px 10px 30px'}}>
                        <Accordion.Toggle as={Card.Header} eventKey="6">
                        Q-7. &nbsp; How rewards are distributed through TimeAlly?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="6">
                          <Card.Body style={{color:'#333', fontSize:'14px', fontWeight:'300'}}>Era Swap ecosystem users receive rewards for the tasks they perform. The rewards are always distributed in 50% ES liquid and 50% ES TimeAlly locked to every user in Era Swap ecosystem.</Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card style={{color:'#3c4d6b', marginBottom:'0px', fontWeight:'500', borderRight:'0px', borderLeft:'0px', padding: '10px 0px 10px 30px'}}>
                        <Accordion.Toggle as={Card.Header} eventKey="7">
                        Q-8. &nbsp; How TimeAlly vestors get rewarded in TimeAlly?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="7">
                          <Card.Body style={{color:'#333', fontSize:'14px', fontWeight:'300'}}>Era Swap (ES) has to be claimed by the users based on the work performed in the ecosystem or vesting done in TimeAlly. As per preset rules, if the user has performed tasks, then they are eligible for rewards. User can trigger and withdraw once they have received rewards.</Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card style={{color:'#3c4d6b', marginBottom:'0px', fontWeight:'500', borderRight:'0px', borderLeft:'0px', padding: '10px 0px 10px 30px'}}>
                        <Accordion.Toggle as={Card.Header} eventKey="8">
                        Q-9 &nbsp; Is TimeAlly a guaranteed return plan?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="8">
                          <Card.Body style={{color:'#333', fontSize:'14px', fontWeight:'300'}}>No, TimeAlly doesn’t given any guarantee of any return. however, it gives a guaranteed number of Era Swap tokens (ES) from ES NRT pool to users according to their vesting periods.</Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card style={{color:'#3c4d6b', marginBottom:'0px', fontWeight:'500', borderRight:'0px', borderLeft:'0px', padding: '10px 0px 10px 30px'}}>
                        <Accordion.Toggle as={Card.Header} eventKey="9">
                        Q-10. &nbsp; Does ES give guaranteed return?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="9">
                          <Card.Body style={{color:'#333', fontSize:'14px', fontWeight:'300'}}>ES doesn’t give any guaranteed return however the value of Era Swap depends on demand and supply dynamics of the ecosystem which depends on usage and users.</Card.Body>
                        </Accordion.Collapse>
                      </Card>

                      <Card style={{color:'#3c4d6b', marginBottom:'0px', fontWeight:'500', borderRight:'0px', borderLeft:'0px', padding: '10px 0px 10px 30px'}}>
                        <Accordion.Toggle as={Card.Header} eventKey="10">
                        Q-11. &nbsp; How Time Vaults increases the ES count for TimeAlly vestor?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="10">
                          <Card.Body style={{color:'#333', fontSize:'14px', fontWeight:'300'}}>Time Vault holds the token allocated from NRT every month. The Smart Contract releases ES token from NRT Pool over next 50 years under pre-defined set of rules.<br></br>
                          All ES tokens which are to be released in future are stored in Time Vault and are distributed based on the work performed by the users among them.
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card style={{color:'#3c4d6b', marginBottom:'0px', fontWeight:'500', borderRight:'0px', borderLeft:'0px', padding: '10px 0px 10px 30px'}}>
                        <Accordion.Toggle as={Card.Header} eventKey="11">
                        Q-12. &nbsp; Does Era Swap guarantee Fiat or other crypto?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="11">
                          <Card.Body style={{color:'#333', fontSize:'14px', fontWeight:'300'}}>Era Swap doesn’t guarantee any Fiat or Crypto because Era Swap doesn’t control any Fiat or any other cryptocurrency.</Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card style={{color:'#3c4d6b', marginBottom:'0px', fontWeight:'500', borderRight:'0px', borderLeft:'0px', padding: '10px 0px 10px 30px'}}>
                        <Accordion.Toggle as={Card.Header} eventKey="12">
                        Q-13. &nbsp; Can Era Swap token be used outside the system?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="12">
                          <Card.Body style={{color:'#333', fontSize:'14px', fontWeight:'300'}}>No, Era Swap token can only be used in the Eco System. ES cannot be used outside Era swap Ecosystem.</Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card style={{color:'#3c4d6b', marginBottom:'0px', fontWeight:'500', borderRight:'0px', borderLeft:'0px', padding: '10px 0px 10px 30px'}}>
                        <Accordion.Toggle as={Card.Header} eventKey="13">
                        Q-14. &nbsp; Do you store my private keys, Keystore or mnemonic?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="13">
                          <Card.Body style={{color:'#333', fontSize:'14px', fontWeight:'300'}}>When you load Wallet in the TimeAlly ÐApp, your private keys stay only on your computer. The TimeAlly ÐApp directly talks with blockchain hence any centralized intermediate server is not at all required and hence any of your data is NOT sent to our servers (we are also not recording any usage data). Your computer signs any transactions you authorise and only the signed transaction is submitted to blockchain for being included in blocks by miners who are mining in Ethereum. When you logout or even refresh page your private keys are erased from computer’s memory. The TimeAlly ÐApp source code is open source and anyone can check what is happening.</Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card style={{color:'#3c4d6b', marginBottom:'0px', fontWeight:'500', borderRight:'0px', borderLeft:'0px', padding: '10px 0px 10px 30px'}}>
                        <Accordion.Toggle as={Card.Header} eventKey="14">
                        Q-15. &nbsp; What is Gas Fee / Network Fee?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="14">
                          <Card.Body style={{color:'#333', fontSize:'14px', fontWeight:'300'}}>Ethereum is a decentralized and immutable platform. Tens of thousands of miners dedicate their computers to maintain the Ethereum network. For compensation, the concept of the gas fee is there. All transactions on Ethereum Network cost gas and this fee is transferred to miners in ETH. Users can choose to pay less or more gas to miners. A miner can choose which transactions to mine, and generally, they give priority to those transactions which give them more fees. You can customize your gas fees in the advanced settings while making staking, withdrawal or any transaction.</Card.Body>
                        </Accordion.Collapse>
                      </Card>

                      <Card style={{color:'#3c4d6b', marginBottom:'0px', fontWeight:'500', borderRight:'0px', borderLeft:'0px', padding: '10px 0px 10px 30px'}}>
                        <Accordion.Toggle as={Card.Header} eventKey="18">
                          Q-16. &nbsp; How To Stake Your Era Swap Tokens In TimeAlly Using Keystore/ Mnemonics/Private Key?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="18">
                          <Card.Body style={{color:'#333', fontSize:'14px', fontWeight:'300'}}>Please watch this video to understand "How To Stake Your Era Swap Tokens In TimeAlly Using Keystore/ Mnemonics/Private Key"

                          <p style={{textAlign: 'center'}}><a style={{color: 'black', textDecoration: 'underline'}} href="https://www.youtube-nocookie.com/embed/qn1q9_SPeT0?rel=0&amp" target="_blank">Click to open the Video in a new tab</a></p>
                          <div className="row">
                            <div className="offset-md-4 col-md-4" >
                                <div style={{position: 'relative', height: 0, overflow: 'hidden', maxWidth: '100%', paddingBottom: '56.25%', marginBottom:'20px', marginTop:'20px'}}>
                                    {/*<iframe src="https://www.youtube-nocookie.com/embed/qn1q9_SPeT0?rel=0&amp;showinfo=0" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} frameBorder={0} allowFullScreen />*/}
                                </div>
                             </div>
                           </div>
                          </Card.Body>
                         </Accordion.Collapse>
                      </Card>
                      <Card style={{color:'#3c4d6b', fontWeight:'500', borderRight:'0px', borderLeft:'0px', padding: '10px 0px 10px 30px'}}>
                        <Accordion.Toggle as={Card.Header} eventKey="15">
                        Q-17. &nbsp; What is GitHub link of TimeAlly.io?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="15">
                          <Card.Body style={{color:'#333', fontSize:'14px', fontWeight:'300'}}>TimeAlly: https://github.com/KMPARDS/timeally-react</Card.Body>
                        </Accordion.Collapse>
                      </Card>


                    </Accordion>
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
