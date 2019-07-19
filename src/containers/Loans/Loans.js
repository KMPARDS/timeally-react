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
                      <li className="active">Apply for Loan</li>
                    </ol>
                  </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="bg-white pinside30">
                    <div className="row">
                      <div className="col-xl-4 col-lg-4 col-md-9 col-sm-12 col-12">
                        <h1 className="page-title">Apply for Loan</h1>
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
                  <Card>
                      <Card.Body align="center">
                        <Card style={{margin: '15px 0', maxWidth: '500px'}}>
                          <Card.Body align="center">
                          <Form>
                            <Form.Group controlId="exampleForm.ControlInput1">
                              <Form.Label>Wallet address</Form.Label>
                              <Form.Control type="text" placeholder="Please enter your wallet address." />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect2">
                              <Form.Label>Example multiple select</Form.Label>
                              <Form.Control as="select" multiple>
                                <option>Stakes : 20000 | Feb 2019</option>
                                <option>Stakes : 80000 | Apr 2019</option>
                                <option>Stakes : 52500 | May 2019</option>
                                <option>Stakes : 62000 | Aug 2019</option>
                                <option>Stakes : 58000 | Sept 2019</option>
                              </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                              <Form.Label>Example textarea</Form.Label>
                              <Form.Control as="textarea" rows="3" />
                            </Form.Group>
                            <Button variant="primary">Apply for Loan </Button>
                          </Form>
                          </Card.Body>
                        </Card>
                      </Card.Body>
                    </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
