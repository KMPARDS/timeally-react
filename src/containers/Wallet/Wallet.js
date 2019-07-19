import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Button, Table } from 'react-bootstrap';
import { timeally } from '../../env';

export default () => {
  return (
    <div>
    <div className="page-header">
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="page-breadcrumb">
              <ol className="breadcrumb">
                <li><a href="index.html">Home</a></li>
                <li className="active">Wallet</li>
              </ol>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="bg-white pinside30">
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-9 col-sm-12 col-12">
                  <h1 className="page-title">Wallet</h1>
                </div>
                {/* <div className="col-xl-8 col-lg-8 col-md-3 col-sm-12 col-12">
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="btn-action"> <a href="#" className="btn btn-default">How To Apply</a> </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>           
          </div>
        </div>
      </div>
    </div>
    {/* content start */}
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="wrapper-content bg-white pinside40">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <table class="table">
                      <thead style={{textAlign:'center'}}>
                        <tr>                      
                          <th>Address</th>
                          <th>Plan</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody  style={{textAlign:'center'}}>
                      <tr>
                          <th scope="row">3</th>
                          <td>Larry</td>
                          <td>the Bird</td>
                          <td>@twitter</td>
                        </tr>
                        </tbody>
                    </table>
                {/* /.card listing */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
