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
                                        <p className="spilt-link align-left">About Spilt</p>
                                            <p className="desc-split">For every transfer, there will be a charge depending on the anniversary of the stake. 3% for
                                            &#8804; 1 year, 2% for &#8804; 2 years, 1% for &#8804; 3 years, while &#62; 3 years there will not be any transfer
                                            charge, these charges collected will be burned.</p>
                                          <div className="flex-span-chk">
                                          <p className="desc-spilt-bold">Staking Amount : </p>  <p className="para-margin"> 7804.976628809254477568 ES</p>
                                           </div>
                                           <p className="desc-spilt-bold">Wallet Address: </p>
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
