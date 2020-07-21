import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Button, Accordion } from 'react-bootstrap';
import { timeally } from '../../env';


const ethers = require('ethers');

class Transfer extends Component {
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
                                            <p className="spilt-link">About Spilt</p>
                                            <p>All Time Ally 1 Life Time Stake holders will get opportunity to avail TimeAlly loan which they have to repay back within 30 Day 10 Hours
                                             or before end of ES NRT Month (whichever is earlier). There will be an interest of 0.1% per day on the loan amount.</p>
                                          <div className="flex-span-chk">
                                           <p>Staking Amount : </p> <p>7804.976628809254477568 ES</p>
                                           </div>
                                           <p>Wallet Address: </p>
                                           <input className="delegate-sm-box" type="text" id="owner" name="owner" placeholder="Enter the wallet address where you want to transfer" />
                                           <div className="flex-span-chk">
                                           <p>Note:</p><p>ES 1 would be charged as a transaction charge</p>
                                           </div>
                                           <a class="btn btn-default main-btn-blue">Confirm</a>
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

export default Transfer;
