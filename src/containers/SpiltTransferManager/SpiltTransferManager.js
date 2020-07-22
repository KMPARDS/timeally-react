import React, { Component } from 'react';
import { Card, Button, Accordion } from 'react-bootstrap';
import { timeally } from '../../env';
import Transfer from '../SpiltTransferManager/Transfer';
import Merge from '../SpiltTransferManager/Merge';
import Spilt from '../SpiltTransferManager/Spilt';
import SplitTransfer from '../SpiltTransferManager/SplitTransfer';
import './SpiltTransferManager.css';

import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom';

const routes = [
    {
        path: '/spilt',
        exact: true,
        sidebar: () => <div><Spilt/></div>,
        main: () => <h2></h2>
    },


    {
        path: '/transfer',
        sidebar: () => <div><Transfer/></div>,
        main: () => <h2></h2>
    },


    {
        path: '/spilt-transfer',
        sidebar: () => <div><SplitTransfer/></div>,
        main: () => <h2></h2>
    },
    {
        path: '/merge',
        sidebar: () => <div><Merge/></div>,
        main: () => <h2></h2>
    },
]

class SplitTransferManager extends Component {
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
                                   <Router>
                                    <div>
                                    <div className="row stack-box-flex border-spilt">
                                            <div className="stck-1">
                                            <Link to="/spilt" className="spilt-link">Spilt</Link>
                                            </div>
                                            <div className="stck-1">
                                            <Link to="/transfer" className="spilt-link">Transfer </Link>
                                            </div>
                                            <div className="stck-1">
                                            <Link to="/spilt-transfer" className="spilt-link">Spilt Transfer</Link>
                                            </div>
                                            <div className="stck-1">
                                                <Link to="/merge" className="spilt-link">Merge</Link>
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
                                    </Router>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default SplitTransferManager;
