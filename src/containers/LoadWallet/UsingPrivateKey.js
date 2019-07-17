import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
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
      const wallet = new ethers.Wallet(this.state.privateKeyContent, new ethers.providers.InfuraProvider('rinkeby'));
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
      <Card>
        <Card.Body align="center">
          <h4>Unlock wallet using your Private Key</h4>

          <Form onSubmit={this.onPrivateKeySubmit} style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', padding: '10px', width: '400px'}}>

            <Form.Group controlId="privateKey">
              <Form.Control onKeyUp={this.onPrivateKeyUpdate} type="text" placeholder="Enter your Private Key" style={{width: '325px'}} />
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
    );
  }
}

export default connect(state => {return{store: state}})(withRouter(UsingPrivateKey));
