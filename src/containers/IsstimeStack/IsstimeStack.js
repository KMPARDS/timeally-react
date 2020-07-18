import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Card, Button, Accordion} from 'react-bootstrap';
import { timeally } from '../../env';
import './IsstimeStack.css';

const ethers = require('ethers');

class IsstimeStack  extends Component {
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
                            <h1 className="black-head-txt bold-txt">My Stakings</h1>
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
                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                        <div className="row">
                          <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 " style={{textAlign:'center'}}>
                             <span className="title">Current NRT Month</span><br></br><br></br>
                            <span className="number" style={{fontSize:'12px'}}>{this.state.currentMonth}{this.state.currentMonth !== undefined ? null : 'Loading...'}</span>
                            <hr />
                            <span className="title">NRT Release this month</span><br></br><br></br>
                            <span className="number" style={{fontSize:'12px'}}>{this.state.nrtRelease}{this.state.nrtRelease !== undefined ? ' ES' : 'Loading...'}</span>
                          </div>
                          <div className="vl"/>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 " style={{textAlign:'center'}}>
                            <span className="title">Next Month Active Stakings in the Blockchain</span><br></br><br></br>
                            <span className="number" style={{fontSize:'12px'}}>{this.state.totalActiveStakings}{this.state.totalActiveStakings !== undefined ? ' ES' : 'Loading...'}</span>
                            <hr />
                            <span className="title">My Active Stakings</span><br></br><br></br>
                            <span className="number" style={{fontSize:'12px'}}>{this.state.myActiveStakings}{this.state.myActiveStakings !== undefined ? ' ES' : 'Loading...'}</span>
                          </div>
                        </div>
                    </div>
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
      </div>
      </div>
    );
  }
};

export default IsstimeStack;
