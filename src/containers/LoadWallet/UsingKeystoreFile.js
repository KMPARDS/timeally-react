import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Form, Button, Alert, Spinner } from 'react-bootstrap';

import { withRouter } from 'react-router-dom';

import { network } from '../../env';

const ethereumjs = require('ethereumjs-wallet');
const ethers = require('ethers');

class UsingKeystoreFile extends Component {

  static getInitialProps(props) {
    return { store: props.store };
  }

  fileReader = {};

  state = {
    keystoreContent: '',
    password: '',
    unlocking: false,
    passwordErrorDisplay: false,
    walletAddress: '',
    success: false
  };

  handleFileRead = event => {
    const content = this.fileReader.result;
    this.setState({ keystoreContent: content });
  }

  handleFileChosen = file => {
    this.fileReader = new FileReader();
    this.fileReader.onloadend = this.handleFileRead;
    try{
      this.fileReader.readAsText(file);
    } catch (e) {
      console.log(e.message);
    }
  }

  onPasswordUpdate = event => {
    this.setState({ password: event.target.value });
  }

  onKeystoreSubmit = async event => {
    //document.getElementById('btnsubmit').innerHTML = 'unlocking...';
    event.preventDefault();
    await this.setState({ unlocking: true, passwordErrorDisplay: false });
    setTimeout(async () => {
      try {
        const hdWallet =  ethereumjs.fromV3(this.state.keystoreContent, this.state.password);
        const privateKey = hdWallet.getPrivateKey().toString('hex');
        const wallet = new ethers.Wallet(privateKey, new ethers.providers.InfuraProvider(network));
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
    }, 100);


  }

  render() {
    return (
      <Card>
      {console.log(this.props)}
        <Card.Body align="center">
          <h4>Unlock wallet using keystore file</h4>
          <Form onSubmit={this.onKeystoreSubmit} style={{border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', padding: '10px', width: '400px'}}>
            <Form.Group controlId="keystoreFile" >
              <Form.Control onChange={e => this.handleFileChosen(e.target.files[0])} type="file" placeholder="load your keystore file" style={{width: 'auto',border: '1px solid rgba(0,0,0,.125)', borderRadius: '.25rem', padding: '10px'}} />
            </Form.Group>
            <Form.Group controlId="keystorePassword">
              <Form.Control onKeyUp={this.onPasswordUpdate} type="password" placeholder="Enter Keystore Password" style={{width: '325px'}} />
            </Form.Group>

            {this.state.passwordErrorDisplay ?
              <Alert variant="danger">
                Your entered password is invalid.
              </Alert>
            : null}

            {this.state.success ?
              <Alert variant="success">
                Your account is unlocked. Opening your account page...
              </Alert>
            : null}

            <Button variant="primary" id="btnsubmit" type="submit" disabled={this.state.unlocking || !this.state.keystoreContent || !this.state.password}>
              {this.state.unlocking ?
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                style={{marginRight: '2px'}}
              /> : null}
              { this.state.keystoreContent ? ( this.state.password ? ( this.state.unlocking ? 'Unlocking keystore' : 'Unlock wallet now!') : 'Enter password to decrypt' ) : 'Add keystore first' }
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default connect(state => {return{store: state}})(withRouter(UsingKeystoreFile));
