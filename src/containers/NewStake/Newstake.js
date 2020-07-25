import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Button, Accordion } from 'react-bootstrap';
import { timeally } from '../../env';
import './Newstake.css';

const ethers = require('ethers');

class Newstake extends Component {
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
                                            <h2 className="black-head-txt stake-hd">New Isstime Loan</h2>
                                        </div>
                                        <div className="col-xl-8 col-lg-8 col-md-3 col-sm-12 col-12">
                                            <div className="row">
                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div className="btn-action">
                                                        {/* <Button className="btn btn-default btn-sm" onClick={() => this.props.history.push('/stakings/new')}>Apply for Loan</Button> */}
                                                        <img className="isstime-logo-img" src="./images/isstimeeLog.png" />
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
                                        <div className="row">
                                            <div className="col-md-6 col-lg-6 pdb30">
                                                <p className="lever-txt">Amount</p>
                                                <input className="delegate-sm-box" type="text" id="staking" name="staking" placeholder="Enter amount to stake" />
                                                <p className="lever-txt">Select Staking Plan</p>
                                                <input className="delegate-sm-box" type="text" id="staking" name="staking" placeholder="Your Plan" />
                                            </div>
                                        </div>
                                        <div style={{padding: '2rem'}}>
                                        <p className="lever-txt">Terms & Conditions</p>
    
                  <hr></hr>
                  <div style={{overflowY:'scroll', height:'500px'}}>
 <p style={{fontSize:'12px',textAlign:'justify'}}>
                 <br/><br/>
<b>Terms & Conditions For Loan</b><br/>
1. Stakers can split and transfer thier TimeAlly Stakes to other users directly from day 1 of
TimeAlly 1 Life 1 Time Smart Contract<br/>
2. For every transfer, there will be a charge depending on the anniversary of the stake. 3% for &#8804; 1 year, 2% for &#8804; 2 years, 1% for &#8804; 3 years, while &#62; 3 years there will not be any transfer charge, these charges collected will be burned.<br/>
3.In case of transfer. all unclaimed rewards are also transferred to the recipient.<br/>
4.Every split will create a new contract on the current timestamp, unclaimed rewards shall
remain in the initial contract. Hence it is not necessary to claim rewards before splitting. There shall be no charges on splitting<br/>
5. When a staker splits his TimeAlly stakes, his current IssTime Limit also splits in the same
proportion of the split ES amount<br/>
6. IssTime Liquid Limit shall increase with an Active user base of ecosystem. On every 10000
active users for the month IssTime limit will increase by 1% for the next month for all stakers. This limit will not be carried forward and be considered as per actual active users. eg. If in a
month there are 100000 active users, then an additional 10% lssTime Liquid Limit shall
increase for next month<br/>
7. IssTime Liquid Limit shall increase with 225% on restake of individuals Liquid TimeAlly (7.5%
NRT) rewards and Day Swappers liquid rewards. <br/>
8.IssTime Liquid Limit shall increase with 100% on the conversion of individuals Liquid TimeAlly
(7.5% NRT) rewards, TimeAlly Club, and Day Swappers liquid rewards into prepaid stakes.<br/>
9. Loan can be taken for a period of 1 day to 30 days 10 hours with 0.1% interest per day on the
loan amount for one NRT month , if rewards are unclaimed for the respective month at the
time of applying loan.<br/>
10. After repayment of loan, staker will be eligible to claim rewards for the month and there will
be a cool-off period of 1 complete NRT month to become eligible for the next Loan<br/>
11.Maximum IssTime Liquid Limit for any user is 97% of his total stakings.<br/>
12.When interest repaid, the interest received will be added to Luck Pool.<br/>
13.Stakes will be burnt in next NRT month incase of default for Interest and Loan repayment.<br/>
14.In case of submission of intent to willfully default loan at the time of applying loan or before
end of loan period then users will receive 1% additional reward. <br/>At the end of the loan if the
user doesn`t volunteer to inform about loan default then 1% reward of tokens to be burnt will
be awarded to the user who informs about the same on first come first server basis.<br/>
15.In case a person wishes to exit in liquid with IssTime Limit he does not need to pay the
interest..<br/>
16.There will be activisation, TimeAlly Club, and Day Swapper reward on prepaid and liquid top- ups. However, there will not be any activisation, TimeAlly Club and Day Swapper reward on
split, transfer, merger, acquisition and restake cases..<br/>
17.Users can choose to maintain 1 master TimeAlly contract on 1 wallet and merge other
contracts as a top-up. It reduces the hassle of managing multiple TimeAlly contracts.<br/> New
top-up contracts shouldn`t have any unclaimed rewards at the time of merging with master
contract as the unclaimed rewards cannot be recovered at the time of merging. <br/>All IssTime
Liquid Limit of new top-up contracts shall be added into the the master contract..<br/>



                  </p>
                  </div>
                </div>
                <div className="terms-box">
                <input className="chck-box" type="checkbox" name="terms" id="terms" onchange=""/>  I accept the above terms & conditions and wish to proceed further.
                </div>


                <div className="time-avail-flex">
                <a href="/new-stake" class="btn btn-default main-btn-blue">Proceed</a>
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

export default Newstake;
