import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Card, Button, Accordion} from 'react-bootstrap';
import { timeally } from '../../env';
import './IsstimeCalculator.css';

const ethers = require('ethers');

class IsstimeCalculator  extends Component {
  state = {
    
  }

  componentDidMount = async () => {
   
  }

  

  render() {
    return (
      <div>
          <div className="page-header">
                <div className="container">
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="bg-white pinside30">
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 col-md-9 col-sm-12 col-12">
                            <h2 className="black-head-txt bold-txt">TimeAlly 1 Life Time Loan</h2>
                          </div>
                          <div className="col-xl-8 col-lg-8 col-md-3 col-sm-12 col-12">
                            <div className="row">
                              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="btn-action">
                                {/* <Button className="btn btn-default btn-sm" onClick={() => this.props.history.push('/stakings/new')}>Apply for Loan</Button> */}
                                <Button className="pink-btn" onClick={() => this.props.history.push('/stakings/new')}>ISSTIME LIMIT CALCULATOR</Button>
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
          <div>
    <div className="container dashboard-bg">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="wrapper-content bg-white pinside10">
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="row">
                   
                    <div className="v2" />
                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                      <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                          <div className="bg-light">
                          <hr />
                            <span className="title" style={{textAlign:'center'}}>TOTAL STAKED IN 24 HOURS</span>
                            {/* <h2 id="emi" className="pull-right">Graph</h2> */}<br></br><br></br>
                          <h2 className="number">{this.state.stakingsInLast24Hours ? this.state.stakingsInLast24Hours + ' ES' : 'Loading...'}</h2>
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
      </div>
      <div className="container">
       <h2 className="mb20">View Recent Stakings in the World</h2>
       <div className="row">
            <div className="col-lg-12">
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

export default IsstimeCalculator;
