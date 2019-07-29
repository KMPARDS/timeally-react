import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import { network } from '../../env';

const ethers = require('ethers');

class UsingPrivateKey extends Component {

  static getInitialProps(props) {
    return { store: props.store };
  }

  state = {
    privateKeyContent: '',
    unlocking: false,
    privateKeyErrorDisplay: false,
    success: false
  };

  onPrivateKeyUpdate = event => {
    this.setState({ privateKeyContent: event.target.value });
  }

  onPrivateKeySubmit = async event => {
    //document.getElementById('btnsubmit').innerHTML = 'unlocking...';
    event.preventDefault();
    await this.setState({ unlocking: true, passwordErrorDisplay: false });
    try {
      const wallet = new ethers.Wallet(this.state.privateKeyContent, new ethers.providers.InfuraProvider(network));
      console.log(wallet.address);
      this.props.dispatch({ type: 'LOAD-WALLET-INSTANCE', payload: wallet });
      await this.setState({ unlocking: false, success: true });
      setTimeout(()=>{
        this.props.history.push(window.redirectHereAfterLoadWallet || '/user');
      }, 1000);
    } catch (e) {
      // handle wrong password
      console.log(e.message);
      this.setState({ passwordErrorDisplay: true, unlocking: false });
    }


  }

  render() {
    return (
      <div>
      <div className="page-header">
            <div className="container">
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="page-breadcrumb">
                    <ol className="breadcrumb">
                      <li><a onClick={() => this.props.history.push('/')}>Home</a></li>
                      <li className="active">Unlock Wallet</li>
                    </ol>
                  </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="bg-white pinside30">
                    <div className="row">
                      <div className="col-xl-4 col-lg-4 col-md-9 col-sm-12 col-12">
                        <h1 className="page-title">Unlock Wallet</h1>
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
          <h4>Unlock wallet using your Private Key</h4>

          <Form onSubmit={this.onPrivateKeySubmit} style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', padding: '20px 40px', width: '400px'}}>

            <Form.Group controlId="privateKey">
              <Form.Control autocomplete="off" onKeyUp={this.onPrivateKeyUpdate} type="text" placeholder="Enter your Private Key" style={{width: '325px'}} />
            </Form.Group>

            {this.state.privateKeyErrorDisplay ?
              <Alert variant="danger">
                Your entered private key is incorrect.
              </Alert>
            : null}

            {this.state.success ?
              <Alert variant="success">
                Your account is unlocked. Opening your account page...
              </Alert>
            : null}

            <Button variant="primary" id="privateKeysubmit" type="submit" disabled={this.state.unlocking || !this.state.privateKeyContent}>
              {this.state.unlocking ?
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                style={{marginRight: '2px'}}
              /> : null}
              { this.state.privateKeyContent ? ( this.state.unlocking ? 'Unlocking Account' : 'Unlock wallet now!') : 'Enter private key' }
            </Button>
          </Form>
        </Card.Body>
      </Card>
      </div>
      </div>
    </div>
  </div>
</div>
</div>
    );
  }
}

export default connect(state => {return{store: state}})(withRouter(UsingPrivateKey));
