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
                                                   
                                                    <p>Staking</p>
                                                    <div className="delegate-sm-box"> </div>
                                                    <p>Owner Key</p>
                                                    <div className="delegate-sm-box"> </div>
                                                    <p>Platform</p>
                                                    <div className="delegate-sm-box"> </div>

                                    
                                                </div>
                                                <div className="col-md-6 col-lg-6 pdb30">
                                                <p>Delegatee</p>
                                                    <div className="delegate-sm-box"> </div>
                                                    <p>Amount</p>
                                                    <div className="delegate-sm-box"> </div>
                                                    <p>Months</p>
                                                    <div className="delegate-sm-box"> </div>

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
