import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import { network } from '../../env';

const ethers = require('ethers');

class UsingAddress extends Component {

  static getInitialProps(props) {
    return { store: props.store };
  }

  state = {
    addressContent: '',
    unlocking: false,
    addressErrorDisplay: false,
    success: false
  };

  onAddressUpdate = event => {
    this.setState({ addressContent: event.target.value });
  }

  onAddressSubmit = async event => {
    //document.getElementById('btnsubmit').innerHTML = 'unlocking...';
    event.preventDefault();
    await this.setState({ unlocking: true, addressErrorDisplay: false });
    try {
      // creating a temp wallet
      const address = ethers.utils.getAddress(this.state.addressContent);
      // const wallet = new ethers.Wallet('0x0000000000000000000000000000000000000000000000000000000000000001', new ethers.providers.InfuraProvider(network));
      const wallet = {
        address,
        provider: new ethers.providers.InfuraProvider(network),
        _ethersType:'Viewer'}; // updating the address of the wallet.

      this.props.dispatch({ type: 'LOAD-WALLET-INSTANCE', payload: wallet });
      await this.setState({ unlocking: false, success: true });
      setTimeout(()=>{
        this.props.history.push(window.redirectHereAfterLoadWallet || '/user');
      }, 1000);
    } catch (e) {
      // handle wrong password
      console.log(e.message);
      this.setState({ addressErrorDisplay: true, unlocking: false });
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
          <h4>View wallet using Address</h4>

          <p>Please note that using address you will not be able to do any transaction on behalf of the address. To do transaction on behalf of an address on Ethereum Blockchain, you need to have the private key (it can be in form or a mnemonic, keystore or stored inside your hardware wallet or metamask)</p>

          <Form onSubmit={this.onAddressSubmit} style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', padding: '20px 40px', width: '400px'}}>

            <Form.Group controlId="address">
              <Form.Control autocomplete="off" onKeyUp={this.onAddressUpdate} type="text" placeholder="Enter your Address" style={{width: '325px'}} />
            </Form.Group>

            {this.state.addressErrorDisplay ?
              <Alert variant="danger">
                Your entered address is incorrect.
              </Alert>
            : null}

            {this.state.success ?
              <Alert variant="success">
                The address is valid. Opening the account page...
              </Alert>
            : null}

            <Button variant="primary" id="addressSubmit" type="submit" disabled={this.state.unlocking || !this.state.addressContent}>
              {this.state.unlocking ?
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                style={{marginRight: '2px'}}
              /> : null}
              { this.state.addressContent ? ( this.state.unlocking ? 'Verifying address' : 'View account now!') : 'Enter address' }
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

export default connect(state => {return{store: state}})(withRouter(UsingAddress));
