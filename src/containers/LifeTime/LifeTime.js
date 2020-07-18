import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Button, Accordion } from 'react-bootstrap';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { timeally } from '../../env';


import './LifeTime.css';

// import Loader from 'react-loader-spinner';
// export default class App extends React.Component {

const ethers = require('ethers');

class LifeTime extends Component {
  state = {
    nrt: '',
    totalActiveStakingsNextMonth: ''
  }

  componentDidMount = async () => {
    // const currentMonth = await this.props.store.timeallyInstance.functions.getCurrentMonth();
    // (async()=>{
    //   const totalActiveStakingsNextMonth = await this.props.store.timeallyInstance.functions.totalActiveStakings(currentMonth.add(1));

    //   this.setState({ totalActiveStakingsNextMonth: ethers.utils.commify(window.lessDecimals(totalActiveStakingsNextMonth)) });
    // })();
    // (async()=>{
    //   const nrt = await this.props.store.timeallyInstance.functions.timeAllyMonthlyNRT(currentMonth);

    //   this.setState({ nrt: ethers.utils.commify(window.lessDecimals(nrt)) });
    // })();
  };

  render() {
    return (

 <div>
  <div className="hero-section">
      <div className="container">
        <div className="row">
          <div className="banner-con ">
            <div className="hero-tab-block">
               <div className="banner-in-bg pinside40">
                                 <h1 className="text-white">TimeAlly 1 Life Time Smart Contract</h1>
                                 <p className="text-white">Various versions have evolved over the years, sometimes by accident, sometimes on purpose</p>
                                 <div className="mt30">
                                     <a className="btn btn-default main-btn-blue">GET STARTED</a>
                                     <a href="/isstime-stack" className="btn  bg-txt-white">VIEW MY ISSTYME</a>
                                 </div>
                         </div>
                </div>
            </div>
        </div>
      </div>
    </div>

   <div className="bg-white what-bg">
      <div className="container pinside20 ">
      <div className="row">
            <div className="col-xl-12 col-md-12 col-md-12 col-sm-12 col-12">
              <div className="mb100 text-center section-title">
                {/* section title start*/}
                <h2>FEATURES OF TIMEALLY 1LT REWARDS FOR PARTICIPANTS IN ES</h2>
              </div>
              {/* /.section title start*/}
              <div className="row">
                <div className="col-md-4 pinside40 bor-right">
                        <div className="what-dapp ">
                        <h1>15% of NRT</h1>
                             <p>TimeAlly can be claimed 50% in TimeAlly stakes and 50% in Liquid
                             </p>
                         </div>
                 </div> 
                 <div className="col-md-4 pinside40 bor-right">
                         <div className="what-timeally">
                         <h1>10% of NRT</h1>
                             <p>Power Tokens can be sent 50% in TimeAlly stakes and 50% in prepaid ES stakes</p>
                         </div>
                  </div> 
                  <div className="col-md-4 pinside40">
                         <div className="what-timeally">
                         <h1>12% of NRT</h1>
                         <p>ESN PoS CP can be claimed in prepaid ES stakes if POS deligated to ESN node</p> 
                         </div>
                  </div> 
        
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
                <h1 className="black-head-txt">Lorem Ipsum Sample Text</h1>
                <p>We will match you with a loan program that meet your financial need.</p>
              </div>
              {/* /.section title start*/}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 col-lg-6 pdb30">
              <div className="business-loan-products bg-boxshadow">
                  <img src="./images/related-img-2.jpg"/>
                <div className="loan-products-content">
                  <h3>TimeAlly Loan</h3>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 pdb30">
              <div className="business-loan-products bg-boxshadow">
              <div className="circle"><img src="./images/value.png"/></div>
                {/* <div className="loan-products-icon"><i className="flaticon-time-is-money icon-4x icon-primary" /></div> */}
                <div className="loan-products-content">
                  <h3>TimeAlly Club</h3>
                 
                  <p className="read-more-wrap">TimeAlly Club is a premium membership for Era Swap Community, to provide community additional benefits of rewards along  <span className="read-more-target"> with exclusive membership add-ons such as; Utility Bill Payments, Travel & Holidays, Education, Health & Fitness, etc. TimeAlly Club membership is available in 5 categories that are; Silver, Gold, Diamond, Emerald and Ruby</span> </p>
                    <label htmlFor="post-2"  className="btn btn-default read-more-trigger"></label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    
  <div className="section-space80 mb10 features-bg">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-md-12 col-md-12 col-sm-12 col-12">
              <div className="mb100 text-center section-title">
                {/* section title start*/}
                <h1 className="black-head-txt">Something else</h1>
                <p>TimeAlly is an open-source application and can work even without any web-interference. It is powered on a pre-defined set of rules of Smart Contract and executes code of arbitrary algorithmic complexity following standard cryptography with no downtime and keeping everything safe from modifying </p>
                <a rel="noopener noreferrer" className="btn btn-default" href="https://etherscan.io/address/0x5630ee5f247bd6b61991fbb2f117bbeb45990876#code" target="_blank" ><p style={{color:'#fff'}}>View TA Smart Contract</p></a>
              </div>
              {/* /.section title start*/}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-4 pdt30">
              <div className="bg-white pinside30 number-block outline mb60 bg-boxshadow">
              <div className="circle"><img src="./images/control.png"/></div>
                <h3 className="number-title">Control</h3>
                <p>You get bonus rewards based on your TimeAlly Plan, and the value of your ES held may go up as more usage increases of ES Utility</p>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-4 pdt30">
              <div className="bg-white pinside30 number-block outline mb60 bg-boxshadow">
              <div className="circle"><img src="./images/benifits.png"/></div>
                <h3 className="number-title"> Future benefits</h3>
                <p>You get bonus rewards based on your TimeAlly Plan, and the value of your ES held may go up as more usage increases of ES Utility</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 pdt30">
              <div className="bg-white pinside30 number-block outline mb60 bg-boxshadow">
              <div className="circle"><img src="./images/blocks.png"/></div>
                <h3 className="number-title"> Blocks</h3>
                <p>Every transaction triggered by users are recorded transparently & irreversibly in block confirmation so that old transactions persevere forever</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 pdt30">
              <div className="bg-white pinside30 number-block outline mb60 bg-boxshadow">
                <div className="circle"><img src="./images/nomination.png"/></div>
                <h3 className="number-title">Nomination</h3>
                <p>You get to appoint trusted nomine on your plan, who will be receiving all the benefits of TimeAlly in case of uncertainty </p>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-4 pdt30">
              <div className="bg-white pinside30 number-block outline mb60 bg-boxshadow">
              <div className="circle"><img src="./images/no-central-aut.png"/></div>

                <h3 className="number-title">No Central Authority</h3>
                <p>TimeAlly uses Ethereum Virtual Machine (EVM) to execute standard cryptography with no downtime to keep it all safe and untouched .</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 pdt30">
              <div className="bg-white pinside30 number-block outline mb60 bg-boxshadow">

              <div className="circle"><img src="./images/box.png"/></div>
                <h3 className="number-title">ES NRT Distribution</h3>
                <p>With TimeAlly decentralized application you can govern the distribution of ES from NRT (Newly Released Token) pool to users</p>
              </div>
            </div>
          </div>
          
          {/* <div className="row">
            <div className="offset-xl-2 col-xl-8 offset-md-2 col-md-8 offset-md-2 col-md-8 col-sm-12 col-12 text-center"> <a href="#" className="btn btn-default">View Our Loans</a> </div>
          </div> */}
        </div>
      </div>

      <div className="how-bg">
        <div className="card-hero-section">
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
                  <div className="border"></div>
                  <div className="row">
                    <div className="col-md-6 border-right">
                      <h2 className="text-white pdt40 ">In case of more users</h2>
                      <img src="./images/a.png"></img>
                      <p className="text-white">If more users opt for TimeAlly vesting then there will be scarcity of liquid tokens which will create more demand of ES. This way the value of ES holded by users is expected to go up as the price per ES shall increase with increasing demand.</p>
                    </div>
                    <div className="col-md-6">
                      <h2 className="text-white pdt40">In case of few users</h2>
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
            <div className="col-md-6 col-lg-3 pdb30">
              <div className="business-loan-products bg-boxshadow">
                <div className="loan-products-content">
                  <h3>TimeAlly Loan</h3>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 pdb30">
              <div className="business-loan-products bg-boxshadow">
              <div className="circle"><img src="./images/value.png"/></div>
                {/* <div className="loan-products-icon"><i className="flaticon-time-is-money icon-4x icon-primary" /></div> */}
                <div className="loan-products-content">
                  <h3>TimeAlly Club</h3>
                  <input type="checkbox" className="read-more-state" id="post-2" />
                  <p className="read-more-wrap">TimeAlly Club is a premium membership for Era Swap Community, to provide community additional benefits of rewards along  <span className="read-more-target"> with exclusive membership add-ons such as; Utility Bill Payments, Travel & Holidays, Education, Health & Fitness, etc. TimeAlly Club membership is available in 5 categories that are; Silver, Gold, Diamond, Emerald and Ruby</span> </p>
                    <label htmlFor="post-2"  className="btn btn-default read-more-trigger"></label>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 pdb30">
              <div className="business-loan-products bg-boxshadow">
              <div className="circle"><img src="./images/life-insurance.png"/></div>
                {/* <div className="loan-products-icon"><i className="flaticon-rich icon-4x icon-primary" /></div> */}
                <div className="loan-products-content">
                  <h3>TimeAlly Assurance</h3>
                  <input type="checkbox" className="read-more-state" id="post-3" />
                  <p className="read-more-wrap">TimeAlly Super Goal Achiever Plan (TSGAP) is a Decentralized Smart Contract powered Systematic Accumulation Plan designed <span className="read-more-target">  to safeguard community`s interest, so they can have financial support to support their goals, its incentivize Stakers behavior for regularly in a disciplined way. The benefit of this SAP is that Stakers can choose minimal staking in Era Swap, Leverage Power of Compounding, Milestone based Goal Achievement, Booster Bonus, with complete transparency and ownership of your digital assets </span></p>
                    <label htmlFor="post-3"  className="btn btn-default read-more-trigger"></label>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 pdb30">
              <div className="business-loan-products bg-boxshadow">
              <div className="circle"><img src="./images/pet.png"/></div>
                {/* <div className="loan-products-icon"><i className="flaticon-time-is-money icon-4x icon-primary" /></div> */}
                <div className="loan-products-content">
                  <h3>TimeAlly PET </h3>
                  <input type="checkbox" className="read-more-state" id="post-4" />
                  <p className="read-more-wrap">TimeAlly PET Stands for Personal Era Swap Teller, it is a 50-50 Plan designed to provide a helping hand to those who wish <span className="read-more-target">  to stake but couldn’t. It is a Systematic Accumulation Plan powered on Smart Contracts, it is an extraordinary plan intend to help you with your stakings with PET`s Smart Contribution, hence you don’t have to stake the complete amount of your selected plan and PET will contribute another half. For.eg. Choose 100000 ES Plan. Stake 50000 ES & PET will stake another 50000 ES for you </span></p>
                    <label htmlFor="post-4"  className="btn btn-default read-more-trigger"></label>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
       

      <div className="power-bg">
        <div className="card-hero-section ">
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                {/* hero-caption */}
                <div className="card-hero-block text-center">
                  <h1 className="text-white">Power <img src="./images/pt.png" style={{height:'69px'}} /> Tokens</h1>
                  <p className="text-white">Power Tokens are additional 10% of NRT allocated every month to TimeAlly vestors. Power Tokens are allocated to the TimeAlly members in a ratio 10:1 per year. The Power Tokens can be uses to encourage, appreciate, donate to friends, family, collegues on Swappers Wall and services on Time Swappers & Buzcafe.<br></br>To know more about power token the user can read <a href="https://eraswaptoken.io/pdf/eraswap_whitepaper.pdf" target="_blank" >Era Swap White Paper</a><br></br><br></br>
                  <strong>Used to encourage, appreciate new talents</strong>
                  </p>
                   <div className="col-md-12">
                      <span style={{marginLeft:'10px'}}>
                        <a href="http://timeswappers.com/home" target="_blank" >
                         <img src="./images/swp_bz-01.png" style={{ height:'80px'}}></img>
                        </a>
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
      </div>


      <div className="section-space80 bg-white ">
        <div className="container pdb60">
          <div className="row">
            <div className="offset-xl-2 col-xl-8 offset-md-2 col-md-8 offset-md-2 col-md-8 col-sm-12 col-12">
              <div className="text-center section-title">
                {/* section title start*/}
                <h1 className="black-head-txt">Frequently Asked Question</h1>
                <p>Our Mission is to deliver reliable , latest news and opinions</p>
                <hr></hr>
              </div>
              {/* /.section title start*/}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="bg-white">
                    <Accordion defaultActiveKey="0" style={{textAlign:'left'}}>
                      <Card style={{color:'#3c4d6b', marginBottom:'0px', fontWeight:'500', borderRight:'0px', borderLeft:'0px', borderTop:'0px', padding: '10px 0px 10px 30px'}}>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                          Q-1. &nbsp;How much can I burrow?
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
                                    <iframe src="https://www.youtube-nocookie.com/embed/DM6hvVaCu_g?rel=0&amp;showinfo=0" style={{position: 'absolute', top: 0, left: 0, width: '350px', height: '350px'}} frameBorder={0} allowFullScreen />
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
                                  <iframe src="https://www.youtube-nocookie.com/embed/31PT42RIOQs?rel=0&amp;showinfo=0" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} frameBorder={0} allowFullScreen />
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
                                <iframe style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} src="https://www.youtube-nocookie.com/embed/3msYFRo9d4E?rel=0&amp;showinfo=0" frameBorder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
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
                               <iframe style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} src="https://www.youtube-nocookie.com/embed/Jtc3unocmEA?rel=0&amp;showinfo=0" frameBorder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
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

export default LifeTime;
