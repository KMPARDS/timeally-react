import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Button, Accordion } from 'react-bootstrap';
import { timeally } from '../../env';
import './IsstimeStack.css';

const ethers = require('ethers');

class Withdraw extends Component {
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
                            <th>Monthly Benefits</th>
                            <th>Withdraw</th>
                            
                          </tr>
                          <tr>
                            <td>11</td>
                            <td>67.78 ES </td>
                            <td><div className="withdraw-data-flex">
                           <a className="pink-btn-with">WITHDRAW</a>
                           <a className="btn btn-restake">RESTAKE </a>
                            <a className="btn  border-conv">CONVERT TO WES</a>
                                </div></td>
                            
                          </tr>

                          <tr>
                            <td>11</td>
                            <td>67.78 ES </td>
                            <td><div className="withdraw-data-flex">
                           <a className="pink-btn-with">WITHDRAW</a>
                            <a className="btn btn-restake">RESTAKE </a>
                            <a className="btn  border-conv">CONVERT TO WES</a>
                                </div></td>
                            
                          </tr>

                          <tr>
                            <td>11</td>
                            <td>67.78 ES </td>
                            <td><div className="withdraw-data-flex">
                            <a className="pink-btn-with">WITHDRAW</a>
                             <a className="btn btn-restake">RESTAKE </a>
                            <a className="btn  border-conv">CONVERT TO WES</a>
                                </div></td>
                            
                          </tr>

                        <tr>
                            <td>11</td>
                            <td>67.78 ES </td>
                            <td><div className="withdraw-data-flex">
                             <a className="pink-btn-with">WITHDRAW</a>
                             <a className="btn btn-restake">RESTAKE </a>
                            <a className="btn  border-conv">CONVERT TO WES</a>
                                </div></td>
                            
                          </tr>

                          <tr>
                            <td>11</td>
                            <td>67.78 ES </td>
                            <td><div className="withdraw-data-flex">
                            <a className="pink-btn-with">WITHDRAW</a>
                             <a className="btn btn-restake">RESTAKE </a>
                            <a className="btn  border-conv">CONVERT TO WES</a>
                                </div></td>
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

export default Withdraw;
