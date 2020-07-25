import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Button, Accordion } from 'react-bootstrap';
import { timeally } from '../../env';


const ethers = require('ethers');

class Merge extends Component {
    state = {

    }

    componentDidMount = async () => {

    }



    render() {
        return (
            <div>
                <div>
                    <div className="container dashboard-bg">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="wrapper-content-stack bg-white pinside10">
                                    <div className="row">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <p className="spilt-link align-left">About Merge</p>
                                        <p className="desc-split">All Time Ally 1 Life Time Stake holders will get opportunity to avail TimeAlly loan which they have to repay back within 30 Day 10 Hours
                                                  or before end of ES NRT Month (whichever is earlier). There will be an interest of 0.1% per day on the loan amount.</p>
                                          <div className="flex-span-chk">
                                          <p className="desc-spilt-bold">Staking ID: </p> <p className="para-margin">5 </p>
                                           </div>
                                           <div className="flex-span-chk">
                                           <p className="desc-spilt-bold">Staking Amount: </p>  <p className="para-margin">7804.976628809254477568 ES</p>
                                           </div>
                                           <div className="flex-span-chk">
                                           <p className="desc-spilt-bold">Plan: </p>  <p className="para-margin">1 Year</p>
                                           </div>
                                           <p className="spilt-link  align-left">Select another stake to be merged with</p>
                                        </div>
                                    </div>
                                    <div className="row table-padding">
                        <table>
                          <tr>
                            <th>Staking ID</th>
                            <th>Staking Amount</th>
                            <th>Plan</th>
                            <th>Time</th>
                            <th>Estimated next benefit time</th>
                            <th>Unclaimed Benefits</th>
                            <th>Details</th>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>7804.976628809254477568 ES</td>
                            <td>1 Year</td>
                            <td>6/16/2020 4:59:13 PM</td>
                            <td>29 days, 18 hours,43 minutes 24 seconds</td>
                            <td>67.89 ES
                            Go to view staking to
                            withdraw this benefit</td>
                            <td><a href="/stacking-id" className="btn btn-default main-btn-blue view">SELECT</a></td>
                          </tr>

                         <tr>
                            <td>5</td>
                            <td>7804.976628809254477568 ES</td>
                            <td>1 Year</td>
                            <td>6/16/2020 4:59:13 PM</td>
                            <td>29 days, 18 hours,43 minutes 24 seconds</td>
                            <td>67.89 ES
                            Go to view staking to
                            withdraw this benefit</td>
                            <td><a href="/stacking-id" className="btn btn-default main-btn-blue view">SELECT</a></td>
                          </tr>

                         <tr>
                            <td>5</td>
                            <td>7804.976628809254477568 ES</td>
                            <td>1 Year</td>
                            <td>6/16/2020 4:59:13 PM</td>
                            <td>29 days, 18 hours,43 minutes 24 seconds</td>
                            <td>67.89 ES
                            Go to view staking to
                            withdraw this benefit</td>
                            <td><a href="/stacking-id"  className="btn btn-default main-btn-blue view">SELECT</a></td>
                          </tr>

                         <tr>
                            <td>5</td>
                            <td>7804.976628809254477568 ES</td>
                            <td>1 Year</td>
                            <td>6/16/2020 4:59:13 PM</td>
                            <td>29 days, 18 hours,43 minutes 24 seconds</td>
                            <td>67.89 ES
                            Go to view staking to
                            withdraw this benefit</td>
                            <td><a href="/stacking-id" className="btn btn-default main-btn-blue view">SELECT</a></td>
                          </tr>

                         <tr>
                            <td>5</td>
                            <td>7804.976628809254477568 ES</td>
                            <td>1 Year</td>
                            <td>6/16/2020 4:59:13 PM</td>
                            <td>29 days, 18 hours,43 minutes 24 seconds</td>
                            <td>67.89 ES
                            Go to view staking to
                            withdraw this benefit</td>
                            <td><a href="/stacking-id" className="btn btn-default main-btn-blue view">SELECT</a></td>
                          </tr>
                        </table>
                      </div>
                      <div className="del-flex-right">
                                                        <a className="btn btn-default main-btn-blue view">Confirm</a>
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

export default Merge;
