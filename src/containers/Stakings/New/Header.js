import React from 'react';

const header = props => (
    <div>
            <div className="page-header">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="page-breadcrumb">
                      <ol className="breadcrumb">
                        <li><a href="index.html">Home</a></li>
                        <li className="active">New Staking</li>
                      </ol>
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="bg-white pinside30">
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-9 col-sm-12 col-12">
                          <h1 className="page-title">New Staking</h1>
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
                    {/* <div className="sub-nav" id="sub-nav">
                      <ul className="nav nav-justified">
                        <li className="nav-item">
                          <a href="contact-us.html" className="nav-link">Give me call back</a>
                        </li>
                        <li className="nav-item">
                          <a href="#" className="nav-link">Emi Caculator</a>
                        </li>
                      </ul>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
  
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="wrapper-content bg-white pinside40">
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="lender-details">               
                      <div className="lender-rates-list">
                        {props.children}
                      </div>
                     </div>
                    {/* /.card listing */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          </div>
  );

  export default header;