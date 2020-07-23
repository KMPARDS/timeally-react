import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Button, Accordion } from 'react-bootstrap';
import { timeally } from '../../env';
import './Newstake.css';

const ethers = require('ethers');

class Selectstake extends Component {
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
                                            <h2 className="black-head-txt stake-hd">Select Staking for Loan</h2>
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
                                                <td><a href="/stacking-id" className="btn btn-default main-btn-blue view">SELECT</a></td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div className="right-eligible">
                                    <Button className="pink-btn">CHECK LOAN ELIGIBILITY </Button>
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

export default Selectstake;
