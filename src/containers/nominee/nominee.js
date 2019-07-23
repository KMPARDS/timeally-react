import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';

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
                      <li className="active">Nominee</li>
                    </ol>
                  </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="bg-white pinside30">
                    <div className="row">
                      <div className="col-xl-4 col-lg-4 col-md-9 col-sm-12 col-12">
                        <h1 className="page-title">Nominee</h1>
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
          <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
           <div className="wrapper-content bg-white pinside40">
              <div className="loan-eligibility-block">
                 <p>TimeAlly holders have the advantage of adding nominee. TimeAlly User nominee is a person who is nominated in TimeAlly smart contract by user to receive the benefit of TimeAlly smart contract in case he no longer exists. This TimeAlly contract holder will have the option to appoint the nominee.<br></br><br></br>
The nominee can claim the benefits in case the TimeAlly owner does not remain active for (staked year/s + 12 Months).</p><br></br><br></br>
<a href="#" className="btn btn-default">Apply for Nominee</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
