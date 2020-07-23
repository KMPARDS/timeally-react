import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Button, Accordion } from 'react-bootstrap';
import { timeally } from '../../env';
import './IsstimeCalculator.css';

const ethers = require('ethers');

class IsstimeCalculator extends Component {
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
                <div className="avail-container-margin">
                <h2 className="align-left">About TimeAlly 1 Life Time Loan</h2>
              <p className="avail-btm-border">All TimeAlly 1 Life Time Stake holders will get the opportunity to avail TimeAlly loan which
              they have to repay back within 30 Day 10 Hours or before the end of ES NRT Month. There
              will be an interest of 0.1% per day on the loan amount. If the staker fails to repay back the
              TimeAlly Loan Principle amount and interest, then the stakes of the staker will be burnt. The
              amount of Loan, for which an individual staker is eligible, depends on his IssTime Limit,
              however, it cannot be more than 97% of the current staking.</p>
             <div className="time-avail-flex">
              <a href="/select-stake" class="btn btn-default main-btn-blue">AVAIL TIMEALLY LOAN</a>
              </div>
              </div>
              <div class="card-hero-section margin-calc">
                <h2 class="text-white">Want to check your Loan Limit</h2>
                <Button className="pink-btn">TRY ISSTIME LIMIT CALCULATOR</Button>
                  </div>
                  <div className="avail-container-margin">
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <h2 className="align-left">How does IssTime Limit decides the individuals Loan Limit?</h2>
                      <p className="clock-txt">IssTime Limit depends on Four levers (A + B + C + D = IssTime Limit) which are as follows: </p>
                      <div className="row ">
                      <div className="col-md-6 col-lg-6 pdb30">
                        <div className="clock-align"><img className="sm-clock-img" src="./images/time.png" /></div>
                        <div className="lever-box">
                        <p className="clock-head-ln">Lever A</p>
                        <p className="clock-txt">IssTime Liquid Limit will increase by 225% for restaking while 100% for claiming in prepaid
                        ES for Liquid ES rewards received in TimeAlly.</p>
                        </div>
                        <div className="clock-align"><img className="sm-clock-img" src="./images/time.png" /></div>
                        <div className="lever-box">
                        <p className="clock-head-ln">Lever B</p>
                        <p className="clock-txt">IssTime Liquid Limit will increase by 225% for restaking while 100% for claiming in prepaid
                              ES for Liquid ES rewards received in Day Swappers.</p>
                        </div>
                        </div>
                        <div className="col-md-6 col-lg-6 pdb30">
                        <div className="clock-align"><img className="sm-clock-img" src="./images/time.png" /></div>
                        <div className="lever-box">
                        <p className="clock-head-ln">Lever C</p>
                        <p className="clock-txt">IssTime Liquid Limit will increase by 125% for restaking while 100% for claiming in prepaid
                           ES for Liquid ES rewards received in TimeAlly Club.</p>
                        </div>
                        <div className="clock-align"><img className="sm-clock-img" src="./images/time.png" /></div>
                        <div className="lever-box">
                        <p className="clock-head-ln">Lever D</p>
                        <p className="clock-txt">IssTime Liquid Limit will increase by 225% for restaking while 100% for claiming in prepaid
                        ES for Liquid ES rewards received in TimeAlly.</p>
                        </div>
                       </div>
                      </div>
                      <div className="container">
                        <p className="calc-faq-txt">FAQ ON TIMEALLY LOAN & ISSTIME LIMIT</p>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="bg-white">
                              <Accordion defaultActiveKey="0" style={{ textAlign: 'left' }}>
                                <Card style={{ color: '#3c4d6b', marginBottom: '0px', fontWeight: '500', borderRight: '0px', borderLeft: '0px', borderTop: '1px solid #ccc', padding: '10px 0px 10px 30px' }}>
                                  <Accordion.Toggle as={Card.Header} eventKey="1">
                                    Q-1. &nbsp; Can Stakers Transfer their TimeAlly 1LT Contracts to any other?
                        </Accordion.Toggle>
                                  <Accordion.Collapse eventKey="1">
                                    <Card.Body style={{ color: '#333', fontSize: '14px', fontWeight: '300' }}> <br></br><br></br>

                                      <p style={{ textAlign: 'left' }}> Stakers can split and transfer their TimeAlly Stakes to other users directly
                                         from day 1 of TimeAlly 1 Life Time Smart Contract. </p>
                                    </Card.Body>
                                  </Accordion.Collapse>
                                </Card>

                                <Card style={{ color: '#3c4d6b', marginBottom: '0px', fontWeight: '500', borderRight: '0px', borderLeft: '0px', borderTop: '1px solid #ccc', padding: '10px 0px 10px 30px' }}>
                                  <Accordion.Toggle as={Card.Header} eventKey="2">
                                    Q-2. &nbsp; Is there any charge for transferring staking?
                        </Accordion.Toggle>
                                  <Accordion.Collapse eventKey="2">
                                    <Card.Body style={{ color: '#333', fontSize: '14px', fontWeight: '300' }}> <br></br><br></br>

                                      <p style={{ textAlign: 'left' }}> For every transfer, there will be a charge depending on the anniversary of
                                      the stake. 3% for less than and equal to 1 year, 2% for less than and equal to  2 years, 1% for less than and equal to 3 years, while 3
                                      years there will not be any transfer charge, these charges collected will be
burned. </p>

                                    </Card.Body>
                                  </Accordion.Collapse>
                                </Card>

                                <Card style={{ color: '#3c4d6b', marginBottom: '0px', fontWeight: '500', borderRight: '0px', borderLeft: '0px', borderTop: '1px solid #ccc', padding: '10px 0px 10px 30px' }}>
                                  <Accordion.Toggle as={Card.Header} eventKey="3">
                                    Q-3. &nbsp;What happens to unclaimed rewards in case of transfer?
                        </Accordion.Toggle>
                                  <Accordion.Collapse eventKey="3">
                                    <Card.Body style={{ color: '#333', fontSize: '14px', fontWeight: '300' }}> <br></br><br></br>

                                      <p style={{ textAlign: 'left' }}>In case of transfer all unclaimed rewards are also transferred to the
recipient</p>

                                    </Card.Body>
                                  </Accordion.Collapse>
                                </Card>

                                <Card style={{ color: '#3c4d6b', marginBottom: '0px', fontWeight: '500', borderRight: '0px', borderLeft: '0px', borderTop: '1px solid #ccc', padding: '10px 0px 10px 30px' }}>
                                  <Accordion.Toggle as={Card.Header} eventKey="4">
                                    Q-4. &nbsp;  Is it necessary to claim rewards before splitting?
                        </Accordion.Toggle>
                                  <Accordion.Collapse eventKey="4">
                                    <Card.Body style={{ color: '#333', fontSize: '14px', fontWeight: '300' }}> <br></br><br></br>

                                      <p style={{ textAlign: 'left' }}>Every split will create a new contract on the current timestamp,
                                      unclaimed rewards shall remain in the initial contract. Hence it is not necessary
to claim rewards before splitting.</p>

                                    </Card.Body>
                                  </Accordion.Collapse>
                                </Card>

                                <Card style={{ color: '#3c4d6b', marginBottom: '0px', fontWeight: '500', borderRight: '0px', borderLeft: '0px', borderTop: '1px solid #ccc', padding: '10px 0px 10px 30px' }}>
                                  <Accordion.Toggle as={Card.Header} eventKey="5">
                                    Q-5. &nbsp;What happens when a staker splits his TimeAlly stakes?
                        </Accordion.Toggle>
                                  <Accordion.Collapse eventKey="5">
                                    <Card.Body style={{ color: '#333', fontSize: '14px', fontWeight: '300' }}> <br></br><br></br>

                                      <p style={{ textAlign: 'left' }}> When a staker splits his TimeAlly stakes, his current IssTime Limit also
splits in the same proportion of the split ES amount.</p>

                                    </Card.Body>
                                  </Accordion.Collapse>
                                </Card>


                                <Card style={{ color: '#3c4d6b', marginBottom: '0px', fontWeight: '500', borderRight: '0px', borderLeft: '0px', borderTop: '1px solid #ccc', padding: '10px 0px 10px 30px' }}>
                                  <Accordion.Toggle as={Card.Header} eventKey="6">
                                    Q-6. &nbsp;  How userbase on Era Swap Ecosystem increases IssTime Limit?
                        </Accordion.Toggle>
                                  <Accordion.Collapse eventKey="6">
                                    <Card.Body style={{ color: '#333', fontSize: '14px', fontWeight: '300' }}> <br></br><br></br>

                                      <p style={{ textAlign: 'left' }}>IssTime Liquid Limit shall increase with an active user base of the
                                      ecosystem. On every 10,000 active users for the month, IssTime limit will
                                      increase by 1% for the next month for all stakers. This limit will not be carried
                                      forward and be considered as per actual active users. eg. If in a month there
                                      are 1,00,000 active users, then an additional 10% lssTime Liquid Limit shall
increase for next month.</p>

                                    </Card.Body>
                                  </Accordion.Collapse>
                                </Card>


                                <Card style={{ color: '#3c4d6b', marginBottom: '0px', fontWeight: '500', borderRight: '0px', borderLeft: '0px', borderTop: '1px solid #ccc', padding: '10px 0px 10px 30px' }}>
                                  <Accordion.Toggle as={Card.Header} eventKey="7">
                                    Q-7. &nbsp; What is the benefit of restaking of TimeAlly Liquid Rewards & Day
                                    Swappers Rewards?
                        </Accordion.Toggle>
                                  <Accordion.Collapse eventKey="7">
                                    <Card.Body style={{ color: '#333', fontSize: '14px', fontWeight: '300' }}> <br></br><br></br>
                                      <p style={{ textAlign: 'left' }}>ssTime Liquid Limit shall increase with 225% on restake of individual's
liquid TimeAlly (7.5% NRT) rewards and Day Swappers liquid rewards.</p>
                                    </Card.Body>
                                  </Accordion.Collapse>
                                </Card>


                                <Card style={{ color: '#3c4d6b', marginBottom: '0px', fontWeight: '500', borderRight: '0px', borderLeft: '0px', borderTop: '1px solid #ccc', padding: '10px 0px 10px 30px' }}>
                                  <Accordion.Toggle as={Card.Header} eventKey="8">
                                    Q-8. &nbsp; What is the benefit of restaking of TimeAlly Club Rewards?
                        </Accordion.Toggle>
                                  <Accordion.Collapse eventKey="8">
                                    <Card.Body style={{ color: '#333', fontSize: '14px', fontWeight: '300' }}> <br></br><br></br>

                                      <p style={{ textAlign: 'left' }}>IssTime Liquid Limit shall increase with 125% on restake of individuals
TimeAlly Club rewards.</p>

                                    </Card.Body>
                                  </Accordion.Collapse>
                                </Card>

                                <Card style={{ color: '#3c4d6b', marginBottom: '0px', fontWeight: '500', borderRight: '0px', borderLeft: '0px', borderTop: '1px solid #ccc', padding: '10px 0px 10px 30px' }}>
                                  <Accordion.Toggle as={Card.Header} eventKey="9">
                                    Q-9. &nbsp;  What is the benefit of converting all liquid rewards into WES stakes?
                        </Accordion.Toggle>
                                  <Accordion.Collapse eventKey="9">
                                    <Card.Body style={{ color: '#333', fontSize: '14px', fontWeight: '300' }}> <br></br><br></br>

                                      <p style={{ textAlign: 'left' }}>IssTime Liquid Limit shall increase with 100% on the conversion of
                                      individuals Liquid TimeAlly (7.5% NRT) rewards, TimeAlly Club and Day
Swappers liquid rewards into WES stakes.</p>
                                    </Card.Body>
                                  </Accordion.Collapse>
                                </Card>

                                <Card style={{ color: '#3c4d6b', marginBottom: '0px', fontWeight: '500', borderRight: '0px', borderLeft: '0px', borderTop: '1px solid #ccc', padding: '10px 0px 10px 30px' }}>
                                  <Accordion.Toggle as={Card.Header} eventKey="10">
                                    Q-10. &nbsp;What is the interest rate and duration of TimeAlly Loan?
                        </Accordion.Toggle>
                                  <Accordion.Collapse eventKey="10">
                                    <Card.Body style={{ color: '#333', fontSize: '14px', fontWeight: '300' }}> <br></br><br></br>

                                      <p style={{ textAlign: 'left' }}>Loan can be taken for a period of 1 day to 30 days 10 hours with 0.1%
                                      interest per day on the loan amount for one NRT month if rewards are
unclaimed for the respective month at the time of applying for a loan.</p>
                                    </Card.Body>
                                  </Accordion.Collapse>
                                </Card>

                                <Card style={{ color: '#3c4d6b', marginBottom: '0px', fontWeight: '500', borderRight: '0px', borderLeft: '0px', borderTop: '1px solid #ccc', padding: '10px 0px 10px 30px' }}>
                                  <Accordion.Toggle as={Card.Header} eventKey="11">
                                    Q-11. &nbsp; When a staker can be eligible for the next loan and rewards?
                        </Accordion.Toggle>
                                  <Accordion.Collapse eventKey="11">
                                    <Card.Body style={{ color: '#333', fontSize: '14px', fontWeight: '300' }}> <br></br><br></br>

                                      <p style={{ textAlign: 'left' }}>After repayment of loan, staker will be eligible to claim rewards for the
                                      month and there will be a cool-off period of 1 complete NRT month to become
eligible for the next Loan.</p>
                                    </Card.Body>
                                  </Accordion.Collapse>
                                </Card>


                                <Card style={{ color: '#3c4d6b', marginBottom: '0px', fontWeight: '500', borderRight: '0px', borderLeft: '0px', borderTop: '1px solid #ccc', padding: '10px 0px 10px 30px' }}>
                                  <Accordion.Toggle as={Card.Header} eventKey="12">
                                    Q-12. &nbsp;  What is the maximum IssTime Limit without any charges?
                        </Accordion.Toggle>
                                  <Accordion.Collapse eventKey="12">
                                    <Card.Body style={{ color: '#333', fontSize: '14px', fontWeight: '300' }}> <br></br><br></br>

                                      <p style={{ textAlign: 'left' }}>Maximum IssTime Liquid Limit for any user is 97% of his total stakings.</p>
                                    </Card.Body>
                                  </Accordion.Collapse>
                                </Card>


                                <Card style={{ color: '#3c4d6b', marginBottom: '0px', fontWeight: '500', borderRight: '0px', borderLeft: '0px', borderTop: '1px solid #ccc', padding: '10px 0px 10px 30px' }}>
                                  <Accordion.Toggle as={Card.Header} eventKey="13">
                                    Q-13. &nbsp; What happens to the interest paid by a Loan Borrower?
                        </Accordion.Toggle>
                                  <Accordion.Collapse eventKey="13">
                                    <Card.Body style={{ color: '#333', fontSize: '14px', fontWeight: '300' }}> <br></br><br></br>

                                      <p style={{ textAlign: 'left' }}> When interest repaid, the interest received will be added to Luck Pool.</p>
                                    </Card.Body>
                                  </Accordion.Collapse>
                                </Card>


                                <Card style={{ color: '#3c4d6b', marginBottom: '0px', fontWeight: '500', borderRight: '0px', borderLeft: '0px', borderTop: '1px solid #ccc', padding: '10px 0px 10px 30px' }}>
                                  <Accordion.Toggle as={Card.Header} eventKey="14">
                                    Q-14. &nbsp; What happens in case of Loan amount & Interest Default?
                        </Accordion.Toggle>
                                  <Accordion.Collapse eventKey="14">
                                    <Card.Body style={{ color: '#333', fontSize: '14px', fontWeight: '300' }}> <br></br><br></br>

                                      <p style={{ textAlign: 'left' }}>Stakes will be burnt in the next NRT month in case of default for Interest
and Loan repayment. </p>
                                    </Card.Body>
                                  </Accordion.Collapse>
                                </Card>


                                <Card style={{ color: '#3c4d6b', marginBottom: '0px', fontWeight: '500', borderRight: '0px', borderLeft: '0px', borderTop: '1px solid #ccc', padding: '10px 0px 10px 30px' }}>
                                  <Accordion.Toggle as={Card.Header} eventKey="15">
                                    Q-15. &nbsp;  What happens in case of informing about wilful default of Loan &
                                    Interest?
                        </Accordion.Toggle>
                                  <Accordion.Collapse eventKey="15">
                                    <Card.Body style={{ color: '#333', fontSize: '14px', fontWeight: '300' }}> <br></br><br></br>

                                      <p style={{ textAlign: 'left' }}>In case of submission of intent for wilful default of loan at the time of
                                      applying for a loan or before the end of loan period then users will receive 1%
                                      additional reward. At the end of the loan if the user doesn't volunteer to
                                      inform about loan default then 1% reward of tokens to be burnt will be
                                      awarded to the user who informs about the same on first come first server
basis.</p>
                                    </Card.Body>
                                  </Accordion.Collapse>
                                </Card>

                                <Card style={{ color: '#3c4d6b', marginBottom: '0px', fontWeight: '500', borderRight: '0px', borderLeft: '0px', borderTop: '1px solid #ccc', padding: '10px 0px 10px 30px' }}>
                                  <Accordion.Toggle as={Card.Header} eventKey="16">
                                    Q-16. &nbsp; Can a staker exit with the ES amount equivalent to his IssTime Limit?
                        </Accordion.Toggle>
                                  <Accordion.Collapse eventKey="16">
                                    <Card.Body style={{ color: '#333', fontSize: '14px', fontWeight: '300' }}> <br></br><br></br>

                                      <p style={{ textAlign: 'left' }}>In case a person wishes to exit in liquid with IssTime Limit he does not
need to pay the interest.</p>
                                    </Card.Body>
                                  </Accordion.Collapse>
                                </Card>

                                <Card style={{ color: '#3c4d6b', marginBottom: '0px', fontWeight: '500', borderRight: '0px', borderLeft: '0px', borderTop: '1px solid #ccc', padding: '10px 0px 10px 30px' }}>
                                  <Accordion.Toggle as={Card.Header} eventKey="17">
                                    Q-17. &nbsp; Is there any TimeAlly Club and Day Swappers Rewards on split, transfer,
                                    merger, acquisition, and restake cases?
                        </Accordion.Toggle>
                                  <Accordion.Collapse eventKey="17">
                                    <Card.Body style={{ color: '#333', fontSize: '14px', fontWeight: '300' }}> <br></br><br></br>

                                      <p style={{ textAlign: 'left' }}>There will be activation, TimeAlly Club, and Day Swapper reward on WES
                                      and liquid top-ups. However, there will not be any activisation, TimeAlly Club,
                                      and Day Swappers reward on split, transfer, merger, acquisition, and restake
cases.</p>
                                    </Card.Body>
                                  </Accordion.Collapse>
                                </Card>

                                <Card style={{ color: '#3c4d6b', marginBottom: '0px', fontWeight: '500', borderRight: '0px', borderLeft: '0px', borderTop: '1px solid #ccc', padding: '10px 0px 10px 30px' }}>
                                  <Accordion.Toggle as={Card.Header} eventKey="18">
                                    Q-18. &nbsp; What is Top-Up and how its beneficial?
                        </Accordion.Toggle>
                                  <Accordion.Collapse eventKey="18">
                                    <Card.Body style={{ color: '#333', fontSize: '14px', fontWeight: '300' }}> <br></br><br></br>

                                      <p style={{ textAlign: 'left' }}> Users can choose to maintain 1 master TimeAlly contract on 1 wallet and
                                      merge other contracts as top-up. It reduces the hassle of managing multiple
                                      TimeAlly contracts. New top-up contracts shouldn't have any unclaimed
                                      rewards at the time of merging with the master contract as the unclaimed
                                      rewards cannot be recovered at the time of merging. All IssTime Liquid Limit of
new top-up contracts shall be added into the master contract.</p>
                                    </Card.Body>
                                  </Accordion.Collapse>
                                </Card>
                              </Accordion>
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

export default IsstimeCalculator;
