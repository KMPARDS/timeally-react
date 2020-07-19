import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Button, Accordion } from 'react-bootstrap';
import { timeally } from '../../env';
import './IsstimeStack.css';

const ethers = require('ethers');

class IsstimeElligible extends Component {
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
                                                    <h3>Check your eligibility for Loans</h3>
                                                    <p>Lever A</p>
                                                    <p>Lever B</p>
                                                    <p>Lever C</p>
                                                    <p>Lever D</p>
                                                    <div className="btn-action">
                                                        {/* <Button className="btn btn-default btn-sm" onClick={() => this.props.history.push('/stakings/new')}>Apply for Loan</Button> */}
                                                        <Button className="pink-btn">CHECK ELIGIBILITY</Button>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-6 pdb30">
                                                    <h3>How much loan you are eligible for ?</h3>
                                                    <div className="del-flex-right">
                                                <a  className="btn btn-default main-btn-blue view">DELEGATE</a>
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

export default IsstimeElligible;
