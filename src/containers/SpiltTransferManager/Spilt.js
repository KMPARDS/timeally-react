import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Button, Accordion } from 'react-bootstrap';
import { timeally } from '../../env';


const ethers = require('ethers');

class Spilt extends Component {
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
                                            <p className="desc-split">When a staker splits his TimeAlly stakes, his current IssTime Limit also splits in the same proportion of the split ES amount.</p>
                                          <div className="flex-span-chk">
                                          <p className="desc-spilt-bold">Staking Amount : </p>  <p className="para-margin">7804.976628809254477568 ES</p>
                                           </div>
                                           <p className="desc-spilt-bold">Division Percent: </p>
                                           <input className="delegate-sm-box" type="text" id="owner" name="owner" placeholder="Enter your division Percentage here" />
                                           <div className="flex-span-chk">
                                           </div>
                                           <div className="del-flex-right">
                                           <a className="btn  border-conv">Proceed</a>
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

export default Spilt;
