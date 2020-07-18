import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button, Accordion } from 'react-bootstrap';
import { timeally } from '../../env';
import Topup from '../IsstimeStack/Topup';
import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom'

import './IsstimeStack.css';

const ethers = require('ethers');

const routes = [
    {
        path: '/Topup',
        exact: true,
        sidebar: () => <div><Topup /></div>,
        main: () => <h2></h2>
    },
    // {
    //     path: '/withdraw',
    //     sidebar: () => <div><Pages /></div>,
    //     main: () => <h2></h2>
    // },
    // {
    //     path: '/istime',
    //     sidebar: () => <div><FotoPage /></div>,
    //     main: () => <h2></h2>
    // },
    // {
    //     path: '/split-transfer',
    //     sidebar: () => <div><Club /></div>,
    //     main: () => <h2></h2>
    // },

    // {
    //     path: '/delegate',
    //     sidebar: () => <div><Club /></div>,
    //     main: () => <h2></h2>
    // },
]

class StackingId extends Component {
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
                                            <h1 className="black-head-txt bold-txt">Staking ID : 5</h1>
                                        </div>
                                        <div className="col-xl-8 col-lg-8 col-md-3 col-sm-12 col-12">
                                            <div className="row">
                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div className="btn-action">
                                                        {/* <Button className="btn btn-default btn-sm" onClick={() => this.props.history.push('/stakings/new')}>Apply for Loan</Button> */}
                                                        <Button className="pink-btn" onClick={() => this.props.history.push('/stakings/new')}>NEW 1LIFETIME STAKE</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="stack-bgd-color">
                                        <div className="row stack-box-flex">
                                            <div className="stck-1">
                                            <Link to="/Topup" className="stack-link"> WITHDRAW</Link>
                                            </div>
                                            <div className="stck-1">
                                            <Link to="/Topup" className="stack-link"> TOP UP </Link>
                                            </div>
                                            <div className="stck-1">
                                            <Link to="" className="stack-link"> ISSTIME</Link>
                                            </div>
                                            <div className="stck-1">
                                                <Link to="" className="stack-link"> SPILT TRANSFER MERGE</Link>
                                            </div>
                                            <div className="stck-1">
                                                <Link to="" className="stack-link"> DELEGATE</Link>
                                            </div>
                                        </div>
                                    </div>
                                    {routes.map((route) => (
                                        <Route
                                            key={route.path}
                                            path={route.path}
                                            exact={route.exact}
                                            component={route.sidebar}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default StackingId;
