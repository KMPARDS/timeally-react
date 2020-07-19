import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Button, Accordion } from 'react-bootstrap';
import { timeally } from '../../env';
import './IsstimeStack.css';

const ethers = require('ethers');

class Topup extends Component {
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
                      <div className="row table-padding">
                        <table>
                          <tr>
                            <th>NRT Month</th>
                            <th>Self ES Deposit</th>
                            <th>Status</th>
                            <th>Top Up</th>
                          </tr>
                          <tr>
                            <td>11</td>
                            <td>1000.0 ES  <div className="green-status">Target of 1000.0 ES is Acheived!</div></td>
                            <td>Deposit time elapsed.</td>
                            <td className="topup-gray">MAKE TOP UP</td>
                          </tr>

                          <tr>
                            <td>11</td>
                            <td>1000.0 ES <div className="green-status">Target of 1000.0 ES is Acheived!</div></td>
                            <td>Deposit time elapsed.</td>
                            <td className="topup-gray">MAKE TOP UP</td>
                          </tr>

                          <tr>
                            <td>11</td>
                            <td>1000.0 ES  <div className="green-status">Target of 1000.0 ES is Acheived!</div></td>
                            <td>Deposit time elapsed.</td>
                            <td className="topup-gray">MAKE TOP UP</td>
                          </tr>

                        <tr>
                            <td>11</td>
                            <td>1000.0 ES  <div className="green-status">Target of 1000.0 ES is Acheived!</div></td>
                            <td>Deposit time elapsed.</td>
                            <td className="topup-gray">MAKE TOP UP</td>
                          </tr>

                          <tr>
                            <td>11</td>
                            <td>1000.0 ES  <div className="green-status">Target of 1000.0 ES is Acheived!</div></td>
                            <td>Deposit time elapsed.</td>
                            <td className="topup-gray">MAKE TOP UP</td>
                          </tr>

                         
                        </table>
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

export default Topup;
