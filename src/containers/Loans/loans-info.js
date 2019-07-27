import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { timeally } from '../../env';
// const ethers = require('ethers');

class LoansInfo extends Component {

  render() {
    return (
      <div>
            <div className="page-header">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="page-breadcrumb">
                      <ol className="breadcrumb">
                        <li><a>Home</a></li>
                        <li>TimeAlly Loans</li>
                      </ol>
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="bg-white pinside30">
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-9 col-sm-12 col-12">
                          <h1 className="page-title">TimeAlly Loans</h1>
                        </div>

                        <div className="col-xl-8 col-lg-8 col-md-3 col-sm-12 col-12">
                          <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                              <div className="btn-action">
                              <Button onClick={() => this.props.history.push('/loans/new')}>Apply for Loan</Button>
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
            {/* content start */}
   
            <div className="section-space80 mb10">
        <div className="container">
          <div className="row">
            <div className="offset-xl-2 col-xl-8 offset-md-2 col-md-8 offset-md-2 col-md-8 col-sm-12 col-12">
              <div className="mb100 text-center section-title">
                {/* section title start*/}
                <h1>TimeAlly Loan for TimeAlly holders</h1>
                <p>TimeAlly offers TA loan to the holders of TimeAlly Smart Contract. The maximum loan amount can be 50% of the TimeAlly holding.<br></br><br></br>
                 <span style={{fontWeight:'bold'}}>Initial offer</span>: TimeAlly holders will get opportunity to avail loan  upto 50% after consuming 75% of contract period.  More plan options will be introduced after deployment of 1 year & 2 year vesting initial plans.<br></br><br></br>
                  
                  The features of TA loan are outline below</p>
              </div>
              {/* /.section title start*/}
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="bg-white pinside30 number-block outline mb60 bg-boxshadow">
                <div className="circle"><img src="./images/loan.png"/></div>
                <h3 className="number-title">Flexible Credit Line</h3>
                <p>TimeAlly users can apply for a loan upto 50% of the amount of ES staked in TimeAlly Smart Contract.</p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="bg-white pinside30 number-block outline mb60 bg-boxshadow">
              <div className="circle"><img src="./images/interest.png"/></div>
                <h3 className="number-title">Competitive Interest Rate</h3>
                <p>TimeAlly Smart Contract offers only 1% Rate of Interest to it's users for a duration of 60 days.</p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="bg-white pinside30 number-block outline mb60 bg-boxshadow">
              <div className="circle"><img src="./images/medal.png"/></div>
                <h3 className="number-title">Interest back to Community</h3>
                <p>The Interest amount collected from TimeAlly will be distributed via Luck-pool to the Community.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="bg-white pinside30 number-block outline mb20 bg-boxshadow">
              <div className="circle"><img src="./images/stocks.png"/></div>
                <h3 className="number-title">Controlling Volatility</h3>
                <p>TimeAlly controls the volatility by controlling the demand and supply dynamics of Era Swap Ecosystems.</p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="bg-white pinside30 number-block outline mb60 bg-boxshadow">
              <div className="circle"><img src="./images/premium.png"/></div>
              
                <h3 className="number-title">Convenient and Paperless</h3>
                <p>TimeAlly holders can apply for TA Loan, after consuming 75% of contract period in paperless mode.</p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="bg-white pinside30 number-block outline mb60 bg-boxshadow">
              
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
      </div>
    );
  }
}

export default connect(state => {return{store: state}})(LoansInfo);
