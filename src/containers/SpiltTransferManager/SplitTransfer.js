import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Button, Accordion } from 'react-bootstrap';
import { timeally } from '../../env';

const ethers = require('ethers');

class SplitTransfer extends Component {
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
                                        <p className="spilt-link align-left">About Spilt Transfer</p>
                                        <p className="desc-split">Stakers can split and transfer their pre-activated TimeAlly smart contract to other users
from Day 1. Every split will create a new contract on the current timestamp, unclaimed
rewards shall remain in the initial contract. Hence it is not necessary to claim rewards
before splitting.</p>
                                          <div className="flex-span-chk">
                                           <p className="desc-spilt-bold">Staking Amount : </p>  <p className="para-margin">7804.976628809254477568 ES</p>
                                           </div>
                                           <p className="desc-spilt-bold"> Division Percent: </p>
                                           <input className="delegate-sm-box" type="text" id="owner" name="owner" placeholder="Enter your division Percentage here" />
                                           <div className="flex-span-chk">
                                           </div>
                                           <a className="btn  border-conv">Proceed</a>
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

export default SplitTransfer;
