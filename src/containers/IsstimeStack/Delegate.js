import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Button, Accordion } from 'react-bootstrap';
import { timeally } from '../../env';
import './IsstimeStack.css';

const ethers = require('ethers');

class Delegate extends Component {
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
                                            <div className="row ">
                                                <div className="col-md-6 col-lg-6 pdb30">

                                                    <p className="lever-txt">Staking</p>
                                                    <input className="delegate-sm-box" type="text" id="staking" name="staking" placeholder="Enter staking contract address" />
                                                    <p className="lever-txt">Owner Key</p>
                                                    <input className="delegate-sm-box" type="text" id="owner" name="owner" placeholder="Enter Staker private key" />
                                                    <p className="lever-txt">Platform</p>
                                                    <input className="delegate-sm-box" type="text" id="Platform" name="Platform" placeholder="0x56d38C60793b64aeab5E62630a2b690C695779da"/>
                                                </div>

                                                <div className="col-md-6 col-lg-6 pdb30">
                                                    <p className="lever-txt">Delegate</p>
                                                    <input className="delegate-sm-box" type="text" id="delegate" name="delegate" placeholder="Enter Delegatee Wallet address" />
                                                    <p className="lever-txt">Amount</p>
                                                    <input className="delegate-sm-box" type="text" id="amount" name="amount" placeholder="Enter Delegation amount" />
                                                    <p className="lever-txt">Months</p>
                                                    <input className="delegate-sm-box" type="text" id="months" name="months" placeholder="eg : 1,2,3,4" />
                                                    <div className="del-flex-right">
                                                        <a className="btn btn-default main-btn-blue view">DELEGATE</a>
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

export default Delegate;
