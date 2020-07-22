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
                                                    <h3 className="eligible-head">Check your eligibility for Loans</h3>
                                                    <p className="lever-txt">Lever A</p>
                                                    <div className="prcnt-flex">
                                                        <div className="prcnt-box">%</div>
                                                        <div className="value-box" >25</div>
                                                    </div>
                                                    <p className="lever-txt">Lever B</p>
                                                    <div className="prcnt-flex">
                                                        <div className="prcnt-box">%</div>
                                                        <div className="value-box" >25</div>
                                                    </div>
                                                    <p className="lever-txt">Lever C</p>
                                                    <div className="prcnt-flex">
                                                        <div className="prcnt-box">%</div>
                                                        <div className="value-box" >25</div>
                                                    </div>
                                                    <p className="lever-txt">Lever D</p>
                                                    <div className="prcnt-flex">
                                                        <div className="prcnt-box">%</div>
                                                        <div className="value-box" >25</div>
                                                    </div>
                                                    <div className="check-btn-flex">
                                                        <Button className="pink-btn">CHECK ELIGIBILITY</Button>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-6 pdb30">
                                                    <h3 className="eligible-head">How much loan you are eligible for ?</h3>
                                                  <div className="flex-span-chk"><p className="align-eligible txt-eligible">Total Percentage:</p> <h6 className="mt-10"> 125%</h6></div>
                                                   <p className="align-eligible txt-eligible">You are Eligible for this loan </p>
                                                   <h1 className="align-eligible">ES 6520</h1>
                                                   <div className="avail-flex">
                                                   <a className="btn btn-restake">AVAIL ISSTIME LOAN</a>
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
